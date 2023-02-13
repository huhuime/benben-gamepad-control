<p align="center">
<a href="https://huhuime.gitlab.io/benben-gamepad-control/">
  <img src="https://gitlab.com/huhuime/benben-gamepad-control/-/raw/master/res/logo.svg?inline=false" alt="笨笨手柄控制器" width="300">
</a>
</p>

# 笨笨手柄控制器

通过手柄控制笨笨，已支持手机感知方向控制。

## DOME

<https://huhuime.gitlab.io/benben-gamepad-control/>

## 演示

[旋转着前（倒）行（退）](https://www.bilibili.com/video/BV1rT411R7pV/)

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
