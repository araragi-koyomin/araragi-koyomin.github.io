---
author: 往目琛
pubDatetime: 2025-08-01T13:32:45Z
title: 描述语法和语义
slug: descriptive-grammar-and-semantics
draft: false
tags:
  - 程序设计语言原理
category: learning
subcategory: programming-languages
contentType: note
description: 《程序设计语言原理》第三章笔记

---

## 目录

## 3.2 描述语法的普遍问题

- 词素(lexeme)：语法小单元
- 标识符(identifier)：语素分成组，例如变量名、方法、类等。这种组称为标识符
- 标记(token)：每一组用一个名字/标记表示。标记是词素的一个类别。

### 语言识别器

假设我们有一种语言$L$，这种语言使用字母字符集$\Sigma$。我们构造了一个称为识别装置的机制$R$，能够读入$\Sigma$中的字符串。
我们将$R$设计为可以判断输入字符串是否来自$L$。若$R$仅接受那些术语$L$的字符串，那么$R$就是$L$的描述
编译器中的语法分析器就是一个识别器

### 语言生成器

能用来产生语言中句子的一种装置。与语言识别器（判断给定串是否合法）不同，生成器主动构造合法的句子、表达式或程序代码

## 3.3 描述语法的形式方法

