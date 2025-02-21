import {weeklyTotals} from './weeklyTotals.js';

export class userProfile {
    constructor(height, weight, age, biologicalSex, goalWeight, timetable, hours){
        this.daysPassed = 0; //add logic to increment every 24 hours

        //create user input fields/attributes
        //will need to figure out conversion functions that take user input for height,
        // weight, goalWeight biologicalSex (maybe?) and activityLevel
        //and put them in the right units
        this.height = height; //input likely in inches, will convert to cm
        this.weight = weight; //input likely in pounds, will convert to kg
        this.age = age;
        this.biologicalSex = biologicalSex;
        this.activityLevel = this.calcActivityLevel(hours); //one of five levels of activity
        this.goalWeight = goalWeight;
        this.timetable = timetable; //weeks
        this.weeklyCalorieIntake = this.calcCalorieIntake(weight, goalWeight, timetable);

        // Carbs, Protein, and Fat per week in grams
        this.weeklyCarbs = weeklyTotals.calcCarbs(this);
        this.weeklyProtein = weeklyTotals.calcProtein(this);
        this.weeklyFat = weeklyTotals.calcFat(this);



        // Carbs, Protein, and Fat per day in grams
        this.dailyCarbs = Math.round(this.weeklyCarbs / 7);
        this.dailyProtein = Math.round(this.weeklyProtein / 7);
        this.dailyFat = Math.round(this.weeklyFat / 7);

        this.weeklyRemainingCarbs = this.weeklyCarbs;
        this.weeklyRemainingProtein = this.weeklyProtein;
        this.weeklyRemainingFat = this.weeklyFat;

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
        this.biologicalSex = newBiologicalSex;
    }
    set updateActivityLevel(newActivityLevel) {
        this.activityLevel = newActivityLevel;
    }
    set updateGoalWeight(newGoalWeight) {
        this.goalWeight = newGoalWeight;
    }
    set updateTimetable(newTimetable) {
        this.timetable = newTimetable;
    }

    updateDailyValues() {
        if(this.daysPassed === 0){
            this.dailyCarbs = (this.weeklyCarbs / 7);
            this.dailyProtein = (this.weeklyProtein / 7);
            this.dailyFat = (this.weeklyFat / 7);
        }
        else {
            this.dailyCarbs = (this.weeklyRemainingCarbs / (7 - this.daysPassed));
            this.dailyProtein = (this.weeklyRemainingProtein / (7 - this.daysPassed));
            this.dailyFat = (this.weeklyRemainingFat / (7 - this.daysPassed));
        }
    }

    calcActivityLevel(hours){
        let level;
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
    calcCalorieIntake(weight, goalWeight, timetable){
        const bmr = this.calcBMR(this)
        const tdee = this.calcEnergyExpenditure(bmr, this.activityLevel)
        let weightChange = goalWeight - weight;
        return Math.round(7 * tdee + (weightChange * 7000 / timetable));
    }

    // Calculates the total daily energy expenditure (TDEE) from BMR and daily activity level
    calcEnergyExpenditure(bmr, activityLevel) {
        let tdee = bmr;
        if(activityLevel === 0){
            tdee *= 1.2;
        }
        else if(activityLevel === 1){
            tdee *= 1.375;
        }
        else if(activityLevel === 2){
            tdee *= 1.55;
        }
        else if (activityLevel === 3){
            tdee *= 1.725;
        }
        else if(activityLevel === 4){
            tdee *= 1.9;
        }
        return tdee;
    }

    // Calculates a user's BMR given their profile
    calcBMR(userProfile) {
        let bmr = 10 * this.getWeight() + 6.25 * this.getHeight() - 5 * this.getAge();
        if(this.getBiologicalSex.equals("male")){
            bmr = bmr + 5;
        }
        else if(this.getBiologicalSex.equals("female")){
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
    }

    get getWeeklyCalorieIntake(){
        return this.weeklyCalorieIntake;
    }

    get getDailyCalorieIntake(){
        return Math.round(this.weeklyCalorieIntake / 7);
    }


   updateDays() {

        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

        // Check if it's exactly 12:00 AM
        if (hours === 0 && minutes === 0) {
            if (day === 0) {
                // If it's Sunday, reset count
                this.daysPassed = 0;
            } else {
                // Otherwise, increment count
                this.daysPassed += 1;
            }
            this.updateDailyValues();
        }

    }

// Check every minute
    //setInterval(checkTime, 60 * 1000); // Runs every 60,000ms (1 min)

}

