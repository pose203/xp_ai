import random
import decimal
from typing import List

def generate_red_packets(total_amount: float, num_people: int) -> List[float]:
    """
    Generate random amounts for red packets that sum to the total amount.
    
    Args:
        total_amount: Total money amount in the red packet
        num_people: Number of people to distribute the money to
        
    Returns:
        List of monetary amounts for each person
    """
    # Validate inputs
    if num_people <= 0:
        raise ValueError("Number of people must be positive")
    if total_amount <= 0:
        raise ValueError("Total amount must be positive")
    
    # Convert to cents to avoid floating point precision issues
    total_cents = int(total_amount * 100)
    if total_cents < num_people:
        raise ValueError("Total amount must be at least 0.01 per person")
    
    # Each person must get at least 1 cent
    remaining_cents = total_cents - num_people
    remaining_people = num_people
    
    result = []
    # Distribute the money randomly
    for i in range(num_people - 1):
        # Maximum amount this person can get
        max_amount = remaining_cents - (remaining_people - 1)
        
        # Generate a random amount between 1 and max_amount
        random_cents = random.randint(0, max_amount) if max_amount > 0 else 0
        
        # The amount this person gets (including the guaranteed 1 cent)
        amount = (random_cents + 1) / 100.0
        result.append(round(amount, 2))
        
        # Update remaining values
        remaining_cents -= random_cents
        remaining_people -= 1
    
    # Last person gets the remaining amount
    result.append(round((remaining_cents + 1) / 100.0, 2))
    
    return result

def demo_red_packets():
    """Demo function to show the algorithm in action"""
    total = 100.0
    people = 10
    
    packets = generate_red_packets(total, people)
    
    print(f"Distributing {total:.2f} among {people} people:")
    for i, amount in enumerate(packets):
        print(f"Person {i+1}: {amount:.2f}")
    
    print(f"Total distributed: {sum(packets):.2f}")
    print(f"Average amount: {sum(packets)/len(packets):.2f}")
    print(f"Min amount: {min(packets):.2f}")
    print(f"Max amount: {max(packets):.2f}")

if __name__ == "__main__":
    demo_red_packets() 