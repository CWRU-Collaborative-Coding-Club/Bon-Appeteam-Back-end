class userProfile {
    constructor(height, weight, age, biologicalSex, goalWeight, timetable){
        //create user input fields/attributes
        //will need to figure out conversion functions that take user input for height,
        // weight, goalWeight biologicalSex (maybe?) and activityLevel
        //and put them in the right units
        this.height = height; //input likely in inches, will convert to cm
        this.weight = weight; //input likely in pounds, will convert to kg
        this.age = age;
        this.biologicalSex = biologicalSex;
        this.activityLevel = userProfile.calcActivityLevel(hours); //
        this.goalWeight = goalWeight;
        this.timetable = timetable; //weeks
    }

    // Manipulator methods
    set updateHeight(newHeight) {
        this.height = newHeight;
    }
    set updateWeight(newWeight) {
        this.weight = newWeight;
    }
    set updateAge(newAge) {
        this.age = newAge;
    }
    set updateBiologicalSex(newBiologicalSex) {
        this.biologicalSex = biologicalSex;
    }
    set updateActivityLevel(newActivityLevel) {
        this.activityLevel = newActivityLevel;
    }
    set updateGoalWeight(newGoalWeight) {
        this.goalWeight = goalWeight;
    }
    set updateTimetable(newTimetable) {
        this.timetable = timetable;
    }

    static calcActivityLevel(hours){
        let level = -1;
        if(hours < 5){
            level = 0;
        }
        else if(hours < 10){
            level = 1;
        }
        else if(hours < 15){
            level = 2;
        }
        else if(hours < 20){
            level = 3;
        }
        else{
            level = 4;
        }
        return level;
    }

    // Calculates
    static calcCalorieIntake(weight, goalWeight, timetable){
        const bmr = userProfile.calcBMR(this)
        const tdee = userProfile.calcEnergyExpenditure(bmr, this.getActivityLevel())
        let calorieIntake = tdee;
        let weightChange = goalWeight - weight;
        calorieIntake = 7 * tdee + (weightChange * 7000 / timetable);
        return calorieIntake;
    }

    // Calculates the total daily energy expenditure (TDEE) from BMR and daily activity level
    static calcEnergyExpenditure(bmr, activityLevel) {
        let tdee = bmr;
        if(activityLevel == 0){
            tdee *= 1.2;
        }
        else if(activityLevel == 1){
            tdee *= 1.375;
        }
        else if(activityLevel == 2){
            tdee *= 1.55;
        }
        else if (activityLevel == 3){
            tdee *= 1.725;
        }
        else if(activityLevel == 4){
            tdee *= 1.9;
        }
        return tdee;
    }

    // Calculates a user's BMR given their profile
    static calcBMR(userProfile) {
        let bmr = 10 * userProfile.getWeight() + 6.25 * userProfile.getHeight() - 5 * userProfile.getAge();
        if(userProfile.getBiologicalSex.equals("male")){
            bmr = bmr + 5;
        }
        else if(userProfile.getBiologicalSex.equals("female")){
            bmr = bmr - 161;
        }
        return bmr;
    }

    // Accessor methods
    get getHeight() {
        return this.height;
    }
    get getWeight() {
        return this.weight;
    }
    get getAge() {
        return this.age;
    }
    get getBiologicalSex() {
        return this.biologicalSex;
    }
    get getActivityLevel() {
        return this.activityLevel;
    }
    get getGoalWeight() {
        return this.goalWeight;
    }

    get getTimeTable(){
        return this.timetable;
