---
title: Injective Functions
type: note
category: functions
order: 2
tags:
  - functions
  - injective
  - one-to-one
publishedAt: '2025-01-11'
summary: "Understanding injective (one-to-one) functions and their properties."
relatedContent: ["mapping", "surjective"]
isPublished: true
---

A [[mapping|Function]] is injective when different elements of the domain are mapped to different elements of the codomain.

This is also called "One-to-One"

Formally:
$$\forall x_1, x_2 \in \mathbb{X}, f(x_1)=f(x_2) \Rightarrow x_1=x_2$$

or "For all elements $x_1, x_2$ in $\mathbb{X}$. If $f$ of $x_1$ equals $f$ of $x_2$ that implies that $x_1$ equals $x_2$"

<img 
  src="/content/assets/images/Injective.png" 
  alt="Injective Function Example" 
  width={600} 
  height={400} 
/>

## Exercise
Show that if $g \bullet f$ is [[injective|Injective]] then $f$ is [[injective|Injective]].
Show an example of where $g \bullet f$ is [[injective|Injective]] but $g$ is not.