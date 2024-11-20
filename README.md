# h5-vue3-ts

## 技术栈 
- [Vite](https://vitejs.dev/)
- [Vue](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [VueRouter](https://router.vuejs.org/zh/)
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)
- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)

## 后端代码
[note-service](https://github.com/myltx/note-service)

## Vscode Plugins

- [Unot](https://marketplace.visualstudio.com/items?itemName=simonhe.unot)
- [Unocss](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Git commit 提交
```bash
# 安装husky
pnpm add --save-dev husky
# husky init
pnpm exec husky init

```
- 提交时推荐使用 cz-cli
```shell
# 添加变更文件
git add .
# 使用 cz-cli 提交
git cz 
# 推送
git push
```
## Git校验

- [husky](https://typicode.github.io/husky/)
- [commitlint](https://commitlint.js.org/)
- [cz-cli](https://github.com/commitizen/cz-cli)
- 
## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
