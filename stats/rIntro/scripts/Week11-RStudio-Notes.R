#### (1) Setup initial directory structure -------------------------------------

## Start by setting your working directory to your psy1903 folder. Replace "~/Desktop/" with the correct path to your psy1903 directory:
##setwd("~/Documents/psy1903/")
setwd("C:/Users/sylvi/Documents/psy1903/")

## Create a new parent directory called "stats" where we will be doing all of our R work:
dir.create("stats/")

## Create a new directory called "rIntro" for today's exercises:
dir.create("stats/rIntro")
## Create a new subdirectories "data", "scripts", & "output" for today's exercises:
dir.create("stats/rIntro/data")
dir.create("stats/rIntro/scripts")
dir.create("stats/rIntro/output")

## Set working directory to the rIntro/scripts parent directory, which will be our home base for today:
setwd("C:/Users/sylvi/Documents/psy1903/stats/rIntro/scripts")

## Save this script as R_introduction.R within your scripts directory (you can just use command+S or File --> Save As)

#### (2) Installation of packages ----------------------------------------------

## Packages are essential toolboxes that you load into R and allow you to do cool things with your data
## One package called "pacman" makes installing packages very easy...

if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R

## Then use p_load and a list of all of the packages that you need for the project (with each one being in "quotes")

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot")  # tidyverse contains many packages like dplyr, tidyr, stringr, and ggplot2, among others, and the additional packages should cover our data manipulations, plotting, and analyses

#### This will create a section of code -------------------------------------
# This is a comment
3 + 5 # This is also a comment, but the "3 + 5" before the hashtag is executable code

#### This will create another section of code ####
# Best practice is to use some comments to describe the goal of this section/line of code
x <- 3 + 5 # Code goes here

sum(1, 2, 3)       # Adds numbers 1, 2, and 3, returns 6
mean(c(1, 2, 3))   # Finds the mean (average) of the numbers. 
length(c(1, 2, 3)) # Finds the length of a vector, returns 3

mean(c(1, 2, 3, NA, 5)) # Will output NA because it doesn't know how to handle it
mean(c(1, 2, 3, NA, 5), na.rm = TRUE) # Will remove the NA and calculate the mean of the remaining numbers, outputting 2.75 (the correct answer)

#### Loading in data using read.csv and path----------------------

mydata <- read.csv("path/to/your/file.csv")

## Important elements of read.csv to keep in mind:

## file: Specifies the path to the file (required), and should always be the first argument.
## header: Set to TRUE by default, indicating that the first row of the CSV file contains column names. Set it to FALSE if your file doesn’t have headers.
## sep: Specifies the delimiter used in the file. read.csv() defaults to a comma (,), so for CSV files, you typically don't need to set this.
## stringsAsFactors: Set to FALSE if you don’t want to automatically convert character columns to factors. This argument can help prevent unexpected conversions to categorical data.
## na.strings: Defines which values should be considered as NA (missing values). This is helpful if your file uses special symbols to denote missing data, like "NA" or "?".

head(mydata)      # View the first few rows, can also use tail function
str(mydata)       # See the structure of the data frame
summary(mydata)   # Get a summary of each column

mydata$moodGroup <-- as.factor(mydata$moodGroup)