import numpy as np, json, wave
from pathlib import Path
rate=32000;beat=60/76;duration=64*3*beat;n=int(duration*rate)
out=np.zeros((n+rate*5,2),dtype=np.float64)
chords=[[48,55,64,67],[45,52,60,64],[41,48,57,60],[43,50,59,62],[40,47,55,59],[45,52,60,64],[50,57,60,65],[43,50,59,62]]
phrases=[[[76,1],[74,.5],[72,1.5]],[[67,1],[69,1],[72,1]],[[74,1.5],[72,.5],[69,1]],[[67,2],[None,1]],[[71,1],[74,.5],[76,1.5]],[[72,1],[69,1],[67,1]],[[69,1.5],[65,.5],[62,1]],[[67,2],[None,1]],[[79,1],[76,1],[74,1]],[[76,1.5],[72,.5],[69,1]],[[77,1],[76,.5],[74,1.5]],[[74,2],[71,1]],[[76,1],[74,1],[71,1]],[[72,2],[69,1]],[[65,1],[69,1],[74,1]],[[72,2],[None,1]]]
def note(m,t,d,v,voice='piano',pan=0):
 if m is None:return
 tail=2.1 if voice=='piano' else .7;attack=.012 if voice=='piano' else (.55 if voice=='strings' else .12)
 ts=np.arange(int((d+tail)*rate))/rate;f=440*2**((m-69)/12)
 env=np.minimum(ts/attack,1)*np.exp(-ts/(d*.55+.3)) if voice=='piano' else np.minimum(ts/attack,1)*np.exp(-np.maximum(0,ts-d)/.16)
 partials=[1,.28,.09,.025] if voice=='piano' else [1,.13] if voice=='strings' else [1,.055,.02]
 signal=sum(a*np.sin(2*np.pi*f*(i+1)*ts) for i,a in enumerate(partials))*env*v
 start=int(t*rate);end=min(start+len(signal),len(out));signal=signal[:end-start]
 out[start:end,0]+=signal*np.sqrt((1-pan)/2);out[start:end,1]+=signal*np.sqrt((1+pan)/2)
for bar in range(64):
 t=bar*3*beat;c=chords[bar%8];section=bar//16
 note(c[0],t,beat*1.8,.095,pan=-.23)
 for k in range(1,6):note(c[1+(k-1)%3],t+k*beat/2,beat*.7,.036*(.9 if k%2 else 1),pan=-.13)
 if bar%2==0 and section!=0:
  for pitch in c[1:]:note(pitch,t,beat*5.1,.011,'strings',.25)
 cursor=0
 for pitch,length in phrases[bar%16]:
  note(None if pitch is None else pitch+(-12 if section==2 else 0),t+cursor*beat,max(.15,length*beat*.8),.07 if section==3 else .082,'flute' if section==2 else 'piano',.15);cursor+=length
for delay,gain in [(.29,.19),(.53,.10),(.83,.055)]:
 offset=int(delay*rate);out[offset:]+=out[:-offset].copy()*gain
out[:len(out)-n]+=out[n:];out=out[:n];out*=.65/max(.65,np.max(np.abs(out)))
metrics={'duration':n/rate,'peak':float(np.max(np.abs(out))),'rms':float(np.sqrt(np.mean(out*out)))}
with wave.open('assets/audio/valley-waltz.wav','wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((out*32767).astype('<i2').tobytes())
Path('assets/audio/valley-waltz.json').write_text(json.dumps(metrics,indent=2));print(metrics)
