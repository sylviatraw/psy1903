#### Questionnaire Scoring -----------------------------------------------------
setwd("C:/Users/sylvi/Documents/psy1903/")
setwd("C:/Users/sylvi/Documents/psy1903/stats/data_cleaning/scripts")
require("pacman")
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

##iat_data <- read.csv("C:\\Users\\sylvi\\Documents\\psy1903\\stats\\data_cleaning\\data\\my-iat-test-data.csv")

## Read in data file to a data frame called iat_test

## Extract questionnaire data
# json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]
# 
# ## Use fromJSON to Convert from JSON to data frame
# questionnaire <- fromJSON(json_data)
# str(questionnaire)
# questionnaire <- as.data.frame(questionnaire)
# 
# ## Convert to numeric
# questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
# 
# 
# ## Reverse score if necessary
# rev_items <- c("question1","question3", "question5", "question7")
# for (rev_item in rev_items) {
#   questionnaire[, rev_item] <- 5 - questionnaire[, rev_item]
# }
# 
# ## Calculate mean or sum score
# score <- rowMeans(questionnaire, na.rm = TRUE)

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
iat_data <- read.csv("../../../osfstorage-archive/no-closet-2024-11-05-21-47-34.csv", header = TRUE, sep = ",", na.strings = "NA", stringsAsFactors = FALSE)

score_questionnaire <- function (data) {

## Extract questionnaire data cell
  json_data <- data[data$trialType == "Questionnaire", "response"]
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  print(questionnaire)
  rev_items <- c("question5","question6", "question10", "question12", "question13", "question14")
  for (rev_item in rev_items) {
    questionnaire[, rev_item] <- 4 - questionnaire[, rev_item]
  }
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

  final<- score_questionnaire(iat_data)
  
  summary(final)
  
## Use fromJSON to convert from JSON to data frame

## Convert to numeric
  calculate_iat_dscore <- function (data) {
    tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == "true",]
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
## Reverse score if necessary

## Calculate & return questionnaire score (mean)
directory_path <- "C:/Users/sylvi/Documents/psy1903/osfstorage-archive/"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
  
i = 1

for (file in files_list) {
    tmp <- read.csv
    participant_ID <- tools::file_path_sans_ext(basename(file))
    dscores[i, "participant_ID"] <- participant_ID
    dscores[i, "d_score"] <- calculate_iat_dscore(tmp)
    tmp$rt <- as.numeric(tmp$rt)
    tmp$correct <- as.logical(tmp$correct)
    factor_list <- c("expectedCategory","expectedCategoryAsDisplayed","leftCategory","rightCategory")
    for (factor in factor_list) {
      tmp[,factor] <- as.factor(tmp[, factor])
    }
    rm(tmp)
    i <- i + 1
}  
  
  ##“rt” column is numeric
  ##“correct” column is logical
 ##Appropriate columns are factors
  ##IAT: "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory"
