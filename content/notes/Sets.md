---
title: "Set Theory"
type: "reference"
category: "course-content"
publishedAt: "2025-01-11"
summary: "Fundamental concepts of set theory, including set operations and properties."
tags: ["sets", "foundations", "notation"]
displayInNotes: true
order: 10
relatedContent: ["Union", "Intersection", "Subset", "empty-set"]
subcategory: "foundations"
isPublished: true
weight: 10
---

## Definition
A set is an unordered collection of objects. 

[[notation|Notation]]: a set $\mathbb{X}$ is a collection of objects, where these objects "belong" to the set.
An object "a" being in a set "$\mathbb{X}$" is often said "a is an element of $\mathbb{X}$" or: $a \in \mathbb{X}$

## How to Define a Set
A set is described by squiggly brackets $\{\}$ and must be unambiguously defined. 
A set's elements can be listed simply: $\mathbb{X} = \{\text{Gold}, \text{Blue}, \text{Red}\}$ 
or described by some pattern or rule: $\mathbb{Y}=\{a, b, c, \dots, y, z\}$
or conditions on another set: 

$$
\mathbb{S} = \{ x \in \mathbb{Z} : 0 \leq x \leq 4 \} = \{0,1,2,3,4\}
$$

The above example would read: "Some set S is defined by an element x of the integers given that it is in-between the bounds 0 and 4 inclusive"

## [[subset|Subsets]]

$$
\emptyset \subset \mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}
$$

## Examples
In descent from the abstract, many common objects you're used to can be easily described by the notion of a set and some rule(s)!

[[empty-set|Empty Set]]: $\emptyset=\{\}$
The Natural Numbers: $\mathbb{N} = \{0, 1, 2, 3, \dots \}$
The Integers: $\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots \}$
The Real Numbers: $\mathbb{R}$ where $\{\sqrt{2}, -129801, 54/23, \pi\} \in \mathbb{R}$

I wonder how these real numbers can be defined? You may need to chose apple to find out...

## Who Cares?
Literally every single mathematical object can be described by sets; Set theory is the language in which modern math has been built up from. The modern ZFC axioms have allowed for more formalization, generalization across domains and diving further into the depths of mathematical theory and application. This tool of abstraction ([[motivation-for-the-abstract|Why Abstract?]]) allows solving the toughest engineering problems and understanding the base of the pyramid will allow you to explore more and more difficult puzzles.