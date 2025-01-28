---
title: "Vector Spans"
type: "reference"
category: "course-content"
publishedAt: "2025-01-16"
summary: "The span of vectors as all possible linear combinations, forming a fundamental subspace."
tags: ["spans", "linear-combinations", "subspaces"]
displayInNotes: true
order: 26
relatedContent: ["linear-combinations", "vector-subspaces", "vector-space"]
subcategory: "operations"
isPublished: true
weight: 26
---

## Definition
The span of vectors $v_1, v_2, \dots, v_n$ from a [[vector-space|Vector Space]] $\mathbb{V}$ is the set of all possible [[linear-combinations|linear combinations]] of these vectors.

Formally:
$$
\text{span}\{v_1,\dots,v_n\} = \{c_1v_1 + c_2v_2 + \dots + c_nv_n : c_i \in \mathbb{F}\}
$$

where $\mathbb{F}$ is our scalar field (usually $\mathbb{R}$ or $\mathbb{C}$).

## Examples
### In $\mathbb{R}^2$
Consider $v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$

Then $\text{span}\{v\}$ is the x-axis - all vectors of the form $\begin{pmatrix} c \\ 0 \end{pmatrix}$ where $c \in \mathbb{R}$.


### In Polynomial Space
Consider $p(x) = 1 + x$

Then $\text{span}\{p(x)\}$ consists of all polynomials of the form $c(1 + x)$ where $c \in \mathbb{R}$.

## Properties
1. The span is always a [[vector-subspaces|subspace]]
2. The span is the smallest subspace containing the vectors
3. $\text{span}\{\mathbf{0}\} = \{\mathbf{0}\}$
4. If $v$ is in the span of some vectors, adding $v$ to those vectors doesn't change the span

## Why Do We Care?
Spans help us understand:
1. How to generate subspaces
2. Which vectors we can "reach" from our starting vectors
3. How many vectors we need to describe a space (dimension)
4. Whether vectors are [[linear-combinations|linearly dependent]]

Think of span as the "reach" of your vectors - it tells you all possible destinations you can get to using only linear combinations as your means of travel.

## Exercise
Show that $\text{span}\{v_1,v_2\} = \text{span}\{v_1\}$ if and only if $v_2$ is a scalar multiple of $v_1$.

