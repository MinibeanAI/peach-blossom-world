# 桃花源 · 山中一日

[在线游玩](https://peach-blossom-world.pages.dev/) · [GitHub 仓库](https://github.com/MinibeanAI/peach-blossom-world)

以《桃花源记》为背景的 Three.js 网页 3D 探索小游戏。沿溪划船、穿山访村，在田园散步、围桌听故事，最后归舟离开；回头再寻时，山口已无迹可寻。

## 玩法

- **缘溪桃林**：沿溪划船，也可在岸边停船，走进桃林。
- **穿山入境**：穿过狭窄山道，走进开阔村庄。
- **田园漫游**：探索田地、池塘、桑竹和房舍，观察村民与动物的日常。
- **村舍做客**：入院歇息，与村民围桌听故事，自由离开或向主人告别。
- **归舟再寻**：回到实际停船处，点击船或登船提示划走；再逆溪寻找进入“重寻不得”。

全景与近景共用同一片村落。沿途可收集六枚山中记忆，进度保存在当前浏览器。

## 操作

WASD / 方向键移动，乘船时 W / S 划行；点击地面寻路，E 或右下角按钮执行当前行动。拖拽旋转、滚轮缩放，可切换高空俯瞰并平移查看各处。背景音乐与环境音分别开关，右侧截图按钮保存风景。

## 本地运行

需要 Python 3；检查与打包需要 Node.js 18 或更新版本。

```sh
npm start
```

打开 <http://127.0.0.1:4186>。项目使用浏览器 ES modules，不能直接双击 HTML 运行。运行时依赖和素材均位于本项目内，无需外部 CDN。

## 构建与部署

```sh
npm run check
npm run build
```

`dist/` 是可部署的静态网站，只包含游戏代码、Three.js、贴图和正在使用的音乐。调试截图、开发脚本、概念图、旧音频和历史版本不会上传到网站。

Cloudflare Pages 项目：`peach-blossom-world`，生产分支：`main`。已登录 Wrangler CLI 的环境可执行：

```sh
npm run deploy
```

也可将 `dist/` 部署到其他支持 HTTPS 的静态托管服务。部署凭证不存储在仓库中。

## 项目结构

- `app.js`：场景、人物、动画、镜头、交互与旅程逻辑。
- `navigation.js`：碰撞与寻路。
- `music.js` / `soundscape.js`：背景音乐与分场景环境音。
- `index.html` / `style.css`：界面和响应式布局。
- `assets/`：运行素材及概念图；`vendor/`：本地 Three.js 模块。
- `scripts/build.mjs`：生产静态文件打包。
- `scripts/*v24.cjs`、`scripts/lost-return-v20.cjs`：登船、返程和结局回归检查。
- `docs/changelog.md`：迭代记录。

浏览器回归脚本保留开发时的本地 Playwright / Chrome 路径；在其他电脑运行时需替换对应路径，并先启动本地服务。`npm run check` 和 `npm run build` 不需要这些测试依赖。

## 素材说明

取意自陶渊明《桃花源记》，角色与场景为程序建模及游戏化演绎；收集任务、茶具、荷花等属于创作补充。背景音乐来自项目提供的录屏音频，经去除首尾静音后使用。概念图与部分贴图由图像生成工具辅助制作。Three.js 使用 MIT 许可，见 `vendor/LICENSE`；该许可不涵盖其他素材。
