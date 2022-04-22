import re
import json
import string

filepath = './app/questions.js'

def load_questions():
    with open(filepath) as f: 
        questions = f.read()
    # Regular expression to find json array contained within JavaScript file:
    array_finder = r"\[.*\]"
    # Switch any single quotation marks to double (expected by Python json module), and watch out for gotchas
    # like 'don"t':
    tidy_questions = re.findall(array_finder, questions, re.DOTALL)[0].replace("'", '"').replace('don"t', "don't")
    return json.loads(tidy_questions)

questions = load_questions()

alphabet = string.ascii_uppercase

output = """
```mermaid
flowchart TD

"""

def format_question(idx, question): 
    letter_id = alphabet[idx]
    question_text = question['flowchart']
    return f'{letter_id}{{{question_text}}};'
    
formatted_question_nodes = [format_question(idx, question) for idx, question in enumerate(questions)]

def add_spacing(inner): 
    def wrapper(*args, **kwargs): 
        return '\t' + inner(*args, **kwargs) + '\n'
    return wrapper

@add_spacing
def format_terminal_node(letter_id, answer, next_move_id): 
    text_to_display = next_move_id.replace('_', ' ')
    return f'{letter_id} -- {answer} --> {next_move_id}[{text_to_display}];'

@add_spacing
def format_edge(letter_id, answer, next_idx): 
    formatted_next_question = formatted_question_nodes[next_idx]
    return f'{letter_id} -- {answer} --> {formatted_next_question}'

for idx, question in enumerate(questions): 
    output += '\t' + formatted_question_nodes[idx] + '\n'
    letter_id = alphabet[idx]
    for answer, next_move in question['edges'].items(): 
        next_move_text, next_move_id = next_move
        if 'TIER' in next_move_id: 
            output += format_terminal_node(letter_id, answer, next_move_id)
            continue
        elif next_move_id == 'next': 
            next_idx = idx + 1
        elif 'move' in next_move_id: 
            next_idx = idx + int(next_move_id.replace('move ', ''))
        else: 
            raise Exception("Unexpected directions in JSON file")
        output += format_edge(letter_id, answer, next_idx)

output += "```"

with open('README.md', 'w') as f: 
    f.write(output)
