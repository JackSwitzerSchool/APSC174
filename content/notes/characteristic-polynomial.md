---
title: Characteristic Polynomial
type: note
category: linear-algebra
order: 1
tags:
  - characteristic-polynomial
  - eigenvalues
  - determinant
  - matrices
publishedAt: '2025-04-03'
summary: "Understanding characteristic polynomials and their role in finding eigenvalues."
relatedContent: ["eigen-stuff", "determinant", "matrix"]
subcategory: "spectral-theory"
isPublished: true
weight: 26
---

## Definition
For a square [[matrix|matrix]] $A$ of size $n \times n$, the **characteristic polynomial** $p_A(\lambda)$ is defined as:
$$p_A(\lambda) = \det(A - \lambda I)$$
where $I$ is the identity [[matrix|matrix]] of the same size as $A$.

## Properties

### Finding Eigenvalues
The eigenvalues of a [[matrix|matrix]] $A$ are the roots of its characteristic polynomial:
$$p_A(\lambda) = 0$$

### Degree and Coefficients
- The characteristic polynomial of an $n \times n$ [[matrix|matrix]] is a polynomial of degree $n$
- The coefficient of $\lambda^n$ is $(-1)^n$
- The constant term is $\det(A)$
- The coefficient of $\lambda^{n-1}$ is $(-1)^{n-1}\text{tr}(A)$, where $\text{tr}(A)$ is the trace of $A$

### Similar Matrices
Two [[matrix|matrices]] are similar if and only if they have the same characteristic polynomial.

## Examples

### 2x2 Matrix
Consider the [[matrix|matrix]]:
$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

The characteristic polynomial is:
$$p_A(\lambda) = \det\begin{pmatrix} a-\lambda & b \\ c & d-\lambda \end{pmatrix} = (a-\lambda)(d-\lambda) - bc = \lambda^2 - (a+d)\lambda + (ad-bc)$$

### 3x3 Matrix
For a general 3x3 [[matrix|matrix]]:
$$A = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix}$$

The characteristic polynomial is:
$$p_A(\lambda) = -\lambda^3 + (a+e+i)\lambda^2 - (ae+ai+ei-bd-cg-fh)\lambda + \det(A)$$

## Applications

The characteristic polynomial is fundamental in:
- Finding eigenvalues of [[matrix|matrices]]
- Determining matrix similarity
- Analyzing stability of dynamical systems
- Solving systems of differential equations
- Understanding matrix diagonalization 