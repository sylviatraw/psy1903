setwd("C:/Users/sylvi/Documents/psy1903/stats/")
dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")

setwd("C:/Users/sylvi/Documents/psy1903/stats/data_cleaning/scripts")

require("pacman")
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

iat_data <- read.csv("../../../osfstor`age-archive/no-closet-2024-11-05-21-47-34.csv")

iat_data2 <- iat_data[iat_data$expectedCategoryAsDisplayed == "Physical illness or LGBTQ+" |
                         iat_data$expectedCategoryAsDisplayed == "Mental illness or Cishet" |
                         iat_data$expectedCategoryAsDisplayed == "Mental illness or LGBTQ+" |
                         iat_data$expectedCategoryAsDisplayed == "Physical illness or Cishet"
  , c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]

summary(iat_data2)
str(iat_data2)

iat_data$leftCategory <- as.factor(iat_data$leftCategory)

str(iat_data)

column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (column_name in column_names) {
  iat_data[,column_name] <- as.factor(iat_data[,column_name])
}

str(iat_data)

iat_data$rt <- round(as.numeric(iat_data$rt), 0)

calculate_iat_dscore <- function (data) {
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,]
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "Mental illness or LGBTQ+" |
                            tmp$expectedCategoryAsDisplayed == "Physical illness or Cishet",]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "Physical illness or LGBTQ+" |
                              tmp$expectedCategoryAsDisplayed == "Mental illness or Cishet",]
  congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
  pooled_sd <- sd(c(congruent_trials$rt, incongruent_trials$rt), na.rm = TRUE)
  dscore <- (congruent_means - incongruent_means) / pooled_sd
  return(dscore)
}

calculate_iat_dscore(iat_data)

directory_path <- "C:/Users/sylvi/Documents/psy1903/osfstorage-archive/"

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
dscores <- data.frame(matrix(nrow = length(files_list), ncol = 4))
## EST
## dScores <- data.frame(matrix(nrow = length(files_list), ncol = 3))

## Rename the default column names to something meaningful
## IAT
colnames(dscores) <- c("participant_ID", "d_score", "whichPrime", "questionnaire")

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
score_questionnaire <- function (data) {
## Extract questionnaire data cell
  json_data <- data[data$trialType == "Questionnaire", "response"]
## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  print(questionnaire)
## Reverse score if necessary
  rev_items <- c("question5","question6", "question10", "question12", "question13", "question14")
  for (rev_item in rev_items) {
    questionnaire[, rev_item] <- 4 - questionnaire[, rev_item]
  }
## Calculate & return questionnaire score (mean)
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}


i = 1

for (file in files_list) {
  tmp <- read.csv(file)
  tmp$rt <- as.numeric(tmp$rt)
  tmp$correct <- as.logical(tmp$correct)
  participant_ID <- tools::file_path_sans_ext(basename(file))
  dscores[i, "participant_ID"] <- participant_ID
  dscores[i, "d_score"] <- calculate_iat_dscore(tmp)
  factor_list <- c("expectedCategory","expectedCategoryAsDisplayed","leftCategory","rightCategory")
  for (factor in factor_list) {
    tmp[,factor] <- as.factor(tmp[, factor])
  }
  dscores[i, "questionnaire"] <- score_questionnaire(tmp)
  dscores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  ##the below code is if I wanted to change the whichPrime variable to appear as 1,2, and 3 instead of as characters
  ##dscores[i, "whichPrime"] <- factor(dscores[i,"whichPrime"], levels = c("Queer", "CisHet", "Control"))
  ##dscores[i, "whichPrime"] <- as.factor(dscores[i, "whichPrime"])
  rm(tmp)
  i <- i + 1
}  
str(dscores)

dscores$whichPrime <- as.factor(dscores$whichPrime)

str(dscores)
# Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable

# Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file

# Remove the temporary data file tmp  

# Increase our row number variable i by one for the next iteration

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dscores,"C:\\Users\\sylvi\\Documents\\psy1903\\stats\\data_cleaning\\data\\participant_dscores.csv", row.names = FALSE)

myIAT_data <- read.csv("C:\\Users\\sylvi\\Documents\\psy1903\\stats\\data_cleaning\\data\\participant_dscores.csv")
view(myIAT_data)
