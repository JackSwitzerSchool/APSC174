---
title: Dimension of a Vector Space
type: note
category: vector-spaces
order: 8
tags:
  - vectors
  - vector-spaces
  - dimension
  - basis
  - linear-independence
publishedAt: '2025-02-24'
summary: "Understanding the concept of dimension in vector spaces and its fundamental properties."
relatedContent: ["vector-space", "basis", "gen-sets", "linear-dependence"]
subcategory: "vector space properties"
isPublished: true
weight: 16
---

## Definition
The **dimension** of a [[vector-space|vector space]] $V$, denoted $\dim(V)$, is the number of vectors in any [[basis|basis]] for $V$.

## Key Lemma
One of the most important results in the theory of vector spaces is:

> **Key Lemma**: Let $V$ be a [[vector-space|vector space]], and suppose that $\{u_1, u_2, \ldots, u_a\}$ is a set of [[linear-dependence|linearly independent]] vectors in $V$, and that $\{v_1, v_2, \ldots, v_b\}$ is a [[gen-sets|spanning set]] for $V$. Then $a \leq b$.

<img 
  src="/content/assets/images/KeyLemma.png" 
  alt="Key Lemma Visualization" 
  width={600} 
  height={400} 
/>

### Implications of the Key Lemma

1. **Well-defined Dimension**: All [[basis|bases]] of a [[vector-space|vector space]] have the same number of elements.
2. **Extending to a Basis**: Any [[linear-dependence|linearly independent]] set can be extended to a [[basis|basis]].
3. **Reducing to a Basis**: Any [[gen-sets|spanning set]] can be reduced to a [[basis|basis]].

## Examples

### Dimension of $\mathbb{R}^n$
The dimension of $\mathbb{R}^n$ is $n$. The standard [[basis|basis]] consists of the $n$ [[vectors|vectors]]:
$$e_1 = (1,0,\ldots,0), e_2 = (0,1,\ldots,0), \ldots, e_n = (0,0,\ldots,1)$$

### Dimension of Polynomial Spaces
The dimension of $P_n$, the space of polynomials of degree at most $n$, is $n+1$. A [[basis|basis]] is:
$$\{1, x, x^2, \ldots, x^n\}$$

### Dimension of Matrix Spaces
The dimension of $M_{m \times n}$, the space of $m \times n$ [[matrix|matrices]], is $mn$.

## Properties

1. **Subspaces**: If $W$ is a [[vector-subspaces|subspace]] of $V$, then $\dim(W) \leq \dim(V)$. Equality holds if and only if $W = V$.

2. **Finite vs. Infinite Dimension**: A [[vector-space|vector space]] is said to be finite-dimensional if it has a finite [[basis|basis]]. Otherwise, it is infinite-dimensional.

3. **Sum of Subspaces**: If $U$ and $W$ are [[vector-subspaces|subspaces]] of $V$, then:
   $$\dim(U + W) = \dim(U) + \dim(W) - \dim(U \cap W)$$

4. **Direct Sum**: If $V = U \oplus W$ (direct sum), then:
   $$\dim(V) = \dim(U) + \dim(W)$$

## Applications

The concept of dimension is fundamental in:

1. **Solving Linear Systems**: A system of $m$ [[systems-of-linear-equations|linear equations]] in $n$ unknowns has a unique solution if and only if the dimension of the solution space is zero.

2. **Linear Transformations**: Understanding the dimension of the domain, range, and [[null-space|kernel]] of a [[linear-transformations|linear transformation]].

3. **Coordinate Systems**: Representing [[vectors|vectors]] in terms of [[basis|basis]] elements.

## Exercise
Prove that if $\{v_1, v_2, \ldots, v_n\}$ is a [[linear-dependence|linearly independent]] set in an $n$-dimensional [[vector-space|vector space]] $V$, then it is a [[basis|basis]] for $V$. 