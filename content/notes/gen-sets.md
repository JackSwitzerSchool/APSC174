---
title: Generating Sets
type: note
category: vector-spaces
order: 7
tags:
  - vectors
  - vector-spaces
  - spanning
  - linear-combinations
publishedAt: '2025-02-24'
summary: "Understanding generating sets (spanning sets) and their role in defining vector spaces."
relatedContent: ["vector-space", "linear-combinations", "vector-spans", "basis"]
subcategory: "vector space properties"
isPublished: true
weight: 15
---

## Definition
We say that the set $\{v_1, v_2, \ldots, v_n\}$ in the [[vector-space|vector space]] $V$ is a **generating set** (or **spanning set**) for $V$ if:

$$S(v_1, v_2, \ldots, v_n) = V$$

That is, if any vector in $V$ can be written as a [[linear-combinations|linear combination]] of $v_1, v_2, \ldots, v_n$.

## Interpretation
A generating set for a vector space provides a way to "build" or "generate" every vector in that space using only linear combinations of the vectors in the generating set. In other words, the [[vector-spans|span]] of the generating set equals the entire vector space.

## Examples

### In $\mathbb{R}^2$
The standard basis vectors $e_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $e_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ form a generating set for $\mathbb{R}^2$.

Any vector $\begin{pmatrix} a \\ b \end{pmatrix}$ in $\mathbb{R}^2$ can be written as:
$$\begin{pmatrix} a \\ b \end{pmatrix} = a \begin{pmatrix} 1 \\ 0 \end{pmatrix} + b \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

### In Polynomial Space
The set $\{1, x, x^2, \ldots, x^n\}$ forms a generating set for the vector space of polynomials of degree at most $n$.

## Properties

1. **Non-uniqueness**: A vector space can have many different generating sets.

2. **Minimal Generating Sets**: A generating set that contains no redundant vectors (i.e., no vector in the set can be expressed as a linear combination of the others) is called a [[basis|basis]].

3. **Finite Generation**: A vector space is said to be finitely generated if it has a finite generating set.

4. **Relation to Dimension**: The minimum size of a generating set for a vector space equals its dimension.

## Importance

Generating sets are fundamental in understanding vector spaces because:

1. They provide a way to describe all vectors in the space using a finite set of vectors.

2. They help determine whether a set of vectors spans the entire space.

3. They are used to find [[basis|bases]] for vector spaces.

4. They connect to the concept of [[linear-dependence|linear dependence and independence]].

## Exercise
Show that the set $\{(1,0,0), (0,1,0), (0,0,1), (1,1,1)\}$ is a generating set for $\mathbb{R}^3$. Is this a minimal generating set? Why or why not?
