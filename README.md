# Knapsack Problem

Given **N** items where each item has some weight and profit associated with it and also given a bag with capacity **W**, [i.e., the bag can hold at most **W** weight in it]. The task is to put the items into the bag such that the sum of profits associated with them is the maximum possible. 


## Instructions for Running
1. Clone the Repository: ```git clone https://github.com/jakobupton/KnapsackProblem```
2. Open to the index.html in your browser.
3. Enter some values for capacity, # of items, followed by weights and values for each item.
    Some suggested values could be 5 items, with a capacity of 10.
    1. Value: 5, Weight: 1
    2. Value: 3, Weight: 2
    3. Value: 5, Weight: 4
    4. Value: 3, Weight: 2
    5. Value: 2, Weight: 5
4. The program will step through the algorithm, comparing the max value at each step, presenting the optimal solution once finished.
   
## Complexity Analysis
The time complexity of the 0/1 Knapsack problem using dynamic programming is **O(N*W)**, where **N** is the number of items and **W** is the capacity of the knapsack. The space complexity is also **O(N*W)**.

## Testing Examples
Due to the nature of the implementation, it would be tough to assert equals in software as the algorithm reads its inputs from HTML elements. We decided to compare our Knapsack Problem Calculator vs Augustine's Implementation.   (Referenced Below)
1. Capacity: 10, Items: 5, Items[{V:5, W:1},{V:3, W:2},{V:5, W:4},{V:3, W:2}, {V:2, W:5}]
- [x] Output: The optimal solution is to choose items 1, 2, 3, 4 with a total weight of 9 and a total value of 16. 
2. Capacity: 15, Items: 6, Items[{V:6, W:5},{V:3, W:2},{V:3, W:3},{V:1, W:1},{V:4, W:3},{V:4, W:2}]
- [x] Output: The optimal solution is to choose items 1, 2, 3, 5, 6 with a total weight of 15 and a total value of 20.
3. Capacity: 10, Items: 6, Items[{V:3, W:4},{V:5, W:6},{V:1, W:2},{V:6, W:5},{V:3, W:3},{V:2, W:2}]
- [x] Output: The optimal solution is to choose items 4, 5, 6 with a total weight of 10 and a total value of 11.

## Contributions: 
- Jinkai Zhang - Visualizing Knapsack Algorithm, Browser Knapsack Algorithm Implementation
- Teny Zhang - GUI Design, Knapsack Backtracking Algorithm Configuration
- Jakob Upton - Complexity Analysis, README, Testing

### References and Link to Repository
Repo: https://github.com/jakobupton/KnapsackProblem  
Mongro. (n.d.). Mongro/algorithm-visualizer. GitHub. https://github.com/mongro/algorithm-visualizer  
GeeksforGeeks. (2024a, August 5). 0/1 Knapsack problem. GeeksforGeeks. https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/  
Knapsack Calculator. Augustine Aykara. https://augustineaykara.github.io/Knapsack-Calculator/  
