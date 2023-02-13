# 笨笨手柄控制器

通过手柄控制笨笨，已支持手机感知方向控制。

## DOME

<https://huhuime.gitlab.io/benben-gamepad-control/>

## 安装

```bash
git clone https://gitlab.com/huhuime/benben-gamepad-control.git
yarn
```

## 测试运行

```bash
yarn dev
```

如需在移动端上测试因蓝牙需要https协议下才能使用，请使用如下命令

```bash
yarn dev:https
```

## 已知问题

- [ ]手机桥接蓝牙手臂控制下延迟较高
- [ ]因ongattserverdisconnected问题导致蓝牙断开响应过慢
