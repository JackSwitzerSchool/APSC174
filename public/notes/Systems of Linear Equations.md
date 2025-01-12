---
title: Systems of Linear Equations
publishedAt: '2025-01-11'
summary: 'Understanding and solving systems of linear equations, with geometric interpretations and practical examples.'
---

## Definition
A system of linear equations is a collection of equations that are of a particular form.

More generally, a linear equation is in the form ( * ):

$$
c_1x_1 + c_2x_2 + \dots + c_{n-1}x_{n-1} + c_nx_n = b
$$

where $c_1, \dots, c_n$ are some constant coefficients from a field (Real or Complex numbers generally) and $x_1, \dots, x_n$ are variables in some linear space.

## Geometric Interpretation
Intuitively, in a 2 dimensional system of linear equations, you are looking at lines in the 2D plane. Solving this system is analogous to simply finding if and where your lines intersect.

In a 3 dimensional system of linear equations, each individual equation describes a 2D slice, also called a plane. Similarly in the above case, a solution to this system is essentially finding locations of intersection of the plane. 

![System of Linear Equations](/assets/LinearSystemSolution.png)

### Example
Consider the system:

$$
\begin{gathered}
2x-5y-13z = 1000 \\
3x-9y+3z = 0 \\
5x-6y-8z = 600
\end{gathered}
$$

Solution: This gives a unique solution of $x=1200$, $y=500$, $z=300$

See [[Solving Systems of Linear Equations|how to solve these systems]].

### Counter Examples
#### a) $\sin(x) = 0.2$ 
$\sin(x)$ is clearly not linear, it cannot be described by ( * )

#### b) $4x_1 + 9x_2x_3=11$
The term $x_2x_3$ is not linear, this is some flavor of quadratic equation

## So What?
You may argue - this is pointless, we live in 3(+) dimensions - who cares about the ability to model 218741 dimensional space. However, this generalization approach gives us tools to model familiar notions of dimensions, functions, geometry, distance, and many more ideas that are necessary to most accurately model the world.