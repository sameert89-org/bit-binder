 
**P** = The set of problems solvable in polynomial time. Algorithms are known to us.
**NP** = The set of problems for which given an answer the correctness of it can be verified in a polynomial time.
NP problems are decision based every guess is either Yes of No, and we want the correct guess yes from the computer. If we wanted a no, then that set of problems is **co-NP** or complementary NP.
*Non deterministic means certain steps are unknown and are like a guess, The computer has to guess from a polynomial number of options and we assume that it makes a good random guess.*

NP problems may have a way to write a non deterministic algorithm poly time algo for solving them. (NP complete guarantee it)

### The Boolean Satisfiability NP problem

The boolean of formula of the form. Given a boolean formula f, can you set the inputs in such a way that the expression evaluates to a 1.
![[Pasted image 20230917195830.png]]

The 3-SAT problem is a subset of the sat problem in which the number of inputs is limited to 3.

It was the first proven NP complete algorithm.

# NP Hard problems
They may or may not be NP but they are hardest of the known NP problems (as far as we know they may turn out to be), any problem which is as hard as hardest NP problem they are considered NP hard. If one np hard is solved it doesn't mean that all of them would be solved.
Read More [here](https://en.wikipedia.org/wiki/NP-hardness)
# NP complete
Subset of NP problems with a special property if you find solution to one of them you can solve all of them. The answers can be verified in polynomial time since it's a subset of NP. They also are a part of NP hard problems that means they are as hard as the hardest of the NP problems i.e. As we mentioned earlier np hard may or may not be np these are those proven to be np.
Some of the NP complete problems: BSAT, Travelling salesman, knapsack problem, subset sum, clique, partition subset equal sum, Hamiltonian cycles


![[Drawing 2023-09-17 20.42.18.excalidraw]]

## Reduction
Reduction means converting one NP to other NP problems. If one NP problem is solve does not mean all of them will be solved like NP hard, only NP complete problems offer that. 

