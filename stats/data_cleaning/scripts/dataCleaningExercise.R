setwd("C:/Users/sylvi/Documents/psy1903/stats/")
dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")

setwd("C:/Users/sylvi/Documents/psy1903/stats/data_cleaning/scripts")

require("pacman")
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

iat_data1 <- read.csv("../../../osfstorage-archive/no-closet-2024-11-05-21-47-34.csv", header = TRUE, sep = ",", na.strings = "NA", stringsAsFactors = FALSE)
str(iat_data1)

summary(iat_data1)

iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "Physical illness or LGBTQ+" |
                         iat_data1$expectedCategoryAsDisplayed == "Mental illness or Cishet" |
                         iat_data1$expectedCategoryAsDisplayed == "Mental illness or LGBTQ+" |
                         iat_data1$expectedCategoryAsDisplayed == "Physical illness or Cishet"
  , c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]

summary(iat_data2)
str(iat_data2)

iat_data2$leftCategory <- as.factor(iat_data2$leftCategory)

str(iat_data2)

column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (column_name in column_names) {
  iat_data2[,column_name] <- as.factor(iat_data2[,column_name])
}

str(iat_data2)

iat_data2$rt <- round(as.numeric(iat_data2$rt), 0)

calculate_iat_dscore <- function (data) {
  tmp <- data[data$rt > 300 & data$rt < 5000,]
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

calculate_iat_dscore(iat_data2)

directory_path <- "C:/Users/sylvi/Documents/psy1903/osfstorage-archive/"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
## IAT
dscores <- data.frame(matrix(nrow = length(files_list), ncol = 2))
## EST
## dScores <- data.frame(matrix(nrow = length(files_list), ncol = 3))

## Rename the default column names to something meaningful
## IAT
colnames(dscores) <- c("participant_ID", "d_score")
## EST
## colnames(dScores) <- c("participant_ID", "emotionA_d_score", "emotionB_d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Now fill in the remaining code following the commented instructions:

## Initiate a for loop that iterates across each file in files_list

# Use read.csv to read in your file as a temporary data frame called tmp

# Assign participant_ID as the basename of the file
for (file in files_list) {
  tmp <- read.csv(file)
  participant_ID <- tools::file_path_sans_ext(basename(file))
  dscores[i, "participant_ID"] <- participant_ID
  dscores[i, "d_score"] <- calculate_iat_dscore(tmp)
  rm(tmp)
  i <- i + 1
}
# Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable

# Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file

# Remove the temporary data file tmp  

# Increase our row number variable i by one for the next iteration

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dscores,"C:/Users/sylvi/Documents/psy1903/stats/data_cleaning/data/participant_dscores.csv", row.names = FALSE)

