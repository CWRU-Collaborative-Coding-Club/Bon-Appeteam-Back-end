import xmltodict
import xml.etree.ElementTree as ET

class Food:
    def __init__(self, food_id, title, meats, grains, dairy, fruitveg, fatsoil, 
                 location, time, calories, carbs, protein, fat, sugars, sodium, dietaryfiber, vegan, gluten, servingsize, description):
        self.food_id = food_id
        self.title = title
        self.meats = meats
        self.grains = grains
        self.dairy = dairy
        self.fruitveg = fruitveg
        self.fatsoil = fatsoil
        self.location = location
        self.time = time
        self.calories = calories
        self.carbs = carbs
        self.protein = protein
        self.fat = fat
        self.sugars = sugars
        self.sodium = sodium
        self.dietaryfiber = dietaryfiber
        self.vegan = vegan
        self.gluten = gluten
        self.servingsize = servingsize
        self.description = description
        


foods =[]

def parse_menu(xml_file):
    # Parse the XML file
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Iterate through each food item
    for food in root.findall('food'):
        food_id = food.get('id')
        title = food.find('title').text
        meats = food.find('meats').text
        grains = food.find('grains').text
        dairy = food.find('dairy').text
        fruitveg = food.find('fruitveg').text
        fatsoils = food.find('fatsoils').text
        location = food.find('location').text
        time = food.find('time').text
        calories = food.find('calories').text
        carbs = food.find('carbs').text
        protein = food.find('protein').text
        fat = food.find('fat').text
        sugars = food.find('sugars').text
        sodium = food.find('sodium').text
        dietaryfiber = food.find('dietaryfiber').text
        vegan = food.find('vegan').text
        gluten = food.find('gluten').text
        servingsize = food.find('servingsize').text
        description = food.find('description').text
        
        food = Food(food_id, title, meats, grains, dairy, fruitveg, fatsoils, location, time, calories, carbs, protein, fat, sugars, sodium, dietaryfiber, vegan, gluten, servingsize, description)
        foods.append(food)
    
    
        
       

# Call the function with the XML file path
parse_menu('menu.xml')
print(foods)
for food in foods:
    if(food.meats == "true"):
        print(food.title)
        
