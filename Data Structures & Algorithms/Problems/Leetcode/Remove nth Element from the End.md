#needcode150  #linked_list 

Apart from annoying edge cases, this is pretty straightforward. 

The naive way would be to store the elements in an array and remove the nth element from the end. 


A better space optimized solution would be to find the number of elements, then run over the list N - i - 1 th node and remove it.

The most optimal solution to do 