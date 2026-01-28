export const humanEvalProblems = [
  {
    id: "HumanEval/0",
    title: "Has Close Elements",
    description: "Check if in given list of numbers, are any two numbers closer to each other than given threshold.",
    prompt: `def has_close_elements(numbers: List[float], threshold: float) -> bool:
    """ Check if in given list of numbers, are any two numbers closer to each other than
    given threshold.
    >>> has_close_elements([1.0, 2.0, 3.0], 0.5)
    False
    >>> has_close_elements([1.0, 2.8, 3.0, 4.0, 5.0, 2.0], 0.3)
    True
    """
`,
    type: "HIGH_CODE",
    durationLimit: 15
  },
  {
    id: "HumanEval/1",
    title: "Separate Paren Groups",
    description: "Input to this function is a string containing multiple groups of nested parentheses. Your goal is to separate those group into separate strings.",
    prompt: `def separate_paren_groups(paren_string: str) -> List[str]:
  """ Input to this function is a string containing multiple groups of nested parentheses.
    Your goal is to separate those group into separate strings.
    >>> separate_paren_groups('( ) (( )) (( )( ))')
  ['()', '(())', '(()())']
    """
`,
    type: "HIGH_CODE",
    durationLimit: 20
  },
  {
    id: "HumanEval/2",
    title: "Truncate Number",
    description: "Given a positive floating point number, it can be decomposed into integer part (largest integer smaller than given number) and decimals.",
    prompt: `def truncate_number(number: float) -> float:
""" Given a positive floating point number, it can be decomposed into
    integer part(largest integer smaller than given number) and decimals.
    Return the decimal part.
    >>> truncate_number(3.5)
0.5
"""
`,
    type: "LOW_CODE",
    durationLimit: 10
  }
];
