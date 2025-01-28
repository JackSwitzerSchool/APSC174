---
title: Basis
publishedAt: '2025-01-23'
summary: 'Understanding the minimal spanning sets of vector spaces. Foundation for dimension theory and coordinate systems.'
---

## Definition
A basis for a [[vector-space|Vector Space]] $\mathbb{V}$ is a set of vectors that is:
1. [[linear-dependence|Linearly independent]]
2. [[vector-spans|Spans]] the entire space $\mathbb{V}$

In other words, a basis is a minimal set of vectors that can generate the entire space through [[linear-combinations|linear combinations]].

## Standard Bases
### In $\mathbb{R}^n$
The standard basis consists of vectors with a 1 in one position and 0s elsewhere:

For $\mathbb{R}^2$:
$$e_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad e_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

### In Polynomial Space
For polynomials of degree ≤ n:
$$\{1, x, x^2, \dots, x^n\}$$

## Properties
1. Every vector in the space has a unique representation as a linear combination of basis vectors
2. All bases of a finite-dimensional vector space have the same size (called the dimension)
3. Any linearly independent set can be extended to a basis
4. Any spanning set contains a basis

## Why Do We Care?
Bases are fundamental because they:
1. Give us coordinate systems
2. Help define dimension
3. Allow efficient representation of vectors
4. Simplify computations in the space

Think of a basis as a "coordinate system" for your vector space - it gives you a standard way to describe any vector in terms of simpler pieces.

## Exercise
Show that if $\{v_1, v_2\}$ is a basis for a vector space $\mathbb{V}$, then any vector $w \in \mathbb{V}$ can be written uniquely as $w = c_1v_1 + c_2v_2$ for some scalars $c_1, c_2$. 