---
title: Eigen-Stuff
type: note
category: linear-algebra
order: 1
tags:
  - eigenvalues
  - eigenvectors
  - eigenspaces
  - linear-transformations
publishedAt: '2025-04-03'
summary: "Understanding eigenvalues, eigenvectors, and eigenspaces in linear algebra."
relatedContent: ["linear-transformations", "matrix", "characteristic-polynomial", "vector-space"]
subcategory: "spectral-theory"
isPublished: true
weight: 25
---

## Definitions

### Eigenvalue and Eigenvector
Let $T: V \rightarrow V$ be a [[linear-transformations|linear transformation]] on a [[vector-space|vector space]] $V$ over a field $\mathbb{F}$. A scalar $\lambda \in \mathbb{F}$ is called an **eigenvalue** of $T$ if there exists a non-zero [[vectors|vector]] $v \in V$ such that:
$$T(v) = \lambda v$$

The non-zero [[vectors|vector]] $v$ is called an **eigenvector** corresponding to the eigenvalue $\lambda$.

### Eigenspace
For a given eigenvalue $\lambda$ of $T$, the **eigenspace** $E_\lambda$ is the set of all [[vectors|vectors]] that satisfy $T(v) = \lambda v$, including the zero [[vectors|vector]]:
$$E_\lambda = \{v \in V : T(v) = \lambda v\}$$

The eigenspace is a [[vector-subspaces|subspace]] of $V$.

## Properties

### Finding Eigenvalues and Eigenvectors
The eigenvalues of a [[matrix|matrix]] $A$ are found by solving the [[characteristic-polynomial|characteristic polynomial]]:
$$p_A(\lambda) = \det(A - \lambda I) = 0$$

For each eigenvalue $\lambda$, the corresponding eigenvectors are the non-zero solutions to:
$$(A - \lambda I)v = 0$$

### Multiplicity
- The **algebraic multiplicity** of an eigenvalue is its multiplicity as a root of the [[characteristic-polynomial|characteristic polynomial]].
- The **geometric multiplicity** of an eigenvalue is the [[vector-space-dimension|dimension]] of its eigenspace.

### Important Theorems
1. The sum of the algebraic multiplicities of all eigenvalues equals the size of the [[matrix|matrix]].
2. The geometric multiplicity of an eigenvalue is always less than or equal to its algebraic multiplicity.
3. A [[matrix|matrix]] is diagonalizable if and only if the geometric multiplicity equals the algebraic multiplicity for every eigenvalue.

## Examples

### 2x2 Matrix
Consider the [[matrix|matrix]]:
$$A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$$

1. Find eigenvalues:
   $$\lambda = 1, 3$$

2. Find eigenvectors:
   - For $\lambda = 1$: $(A - I)v = 0 \Rightarrow v = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$
   - For $\lambda = 3$: $(A - 3I)v = 0 \Rightarrow v = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$

## Applications

Eigenvalues and eigenvectors are fundamental in:
- Solving systems of differential equations
- Principal Component Analysis (PCA) in statistics
- Stability analysis in physics and engineering
- Quantum mechanics (energy levels and states)
- Graph theory (spectral graph theory)
- Computer graphics (principal axes of objects) 