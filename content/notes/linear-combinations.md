---
title: Linear Combinations
type: note
category: vector-spaces
order: 4
tags:
  - vectors
  - linear-combinations
  - fundamentals
publishedAt: '2025-01-11'
summary: "Understanding linear combinations of vectors and their significance."
relatedContent: ["vector-space", "vector-spans", "linear-dependence"]
isPublished: true
---

## Definition
A linear combination of [[vectors|Vectors]] $v_1, v_2, \dots, v_n$ from a [[vector-space|Vector Space]] $\mathbb{V}$ is any vector of the form:

$$
c_1v_1 + c_2v_2 + \dots + c_nv_n
$$

where $c_1, c_2, \dots, c_n$ are scalars from the field $\mathbb{F}$ (usually $\mathbb{R}$ or $\mathbb{C}$).

The scalars $c_i$ are called the coefficients of the linear combination.

## Examples
### In $\mathbb{R}^2$
Consider the vectors $v_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $v_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$

Then $3v_1 - 2v_2 = \begin{pmatrix} 3 \\ -2 \end{pmatrix}$ is a linear combination.

In fact, any vector in $\mathbb{R}^2$ can be written as a linear combination of these vectors! (Why?)

### In Polynomial Space
Consider the polynomials $p_1(x) = 1$ and $p_2(x) = x$ in the [[vector-space|Vector Space]] of polynomials.

Then $2p_1(x) + 3p_2(x) = 2 + 3x$ is a linear combination.

## Why Do We Care?
Linear combinations are fundamental to understanding:
1. [[vector-spans|Spans]] - All possible vectors we can make from linear combinations
2. [[linear-dependence|Linear Independence]] - When vectors can't be written as combinations of each other
3. [[vector-subspaces|Subspaces]] - Sets closed under linear combinations
4. [[basis|Bases]] - Minimal sets of vectors that can make everything in the space

Think of linear combinations as the "building blocks" of linear algebra. Just like you can build complex LEGO structures from simple pieces, you can construct any vector in your space using linear combinations of simpler vectors.

## Exercise
Show that if $v$ and $w$ are in a vector space $\mathbb{V}$, then any linear combination of them is also in $\mathbb{V}$. 
(Hint: Use the [[vector-space-axioms|Vector Space Axioms]])

