setwd("C:/Users/sylvi/Documents/psy1903/stats/")
dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")

setwd("C:/Users/sylvi/Documents/psy1903/stats/data_cleaning/scripts")

require("pacman")
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

iat_data <- read.csv("../../../osfstorage-archive/no-closet-2024-11-05-21-47-34.csv")

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
  dscore <- (incongruent_means - congruent_means) / pooled_sd
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
?hist
hist(dscores$d_score,
     breaks = 30,
     xlim = c(-0.5, 1.5),
     col = "skyblue",
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

boxplot(dscores$d_score ~ dscores$whichPrime)

plot(density(dscores$questionnaire))

density: (dscores$d_score ~ dscores$whichPrime)

require(ggplot2)

qplot(x = whichPrime,
      y = d_score,
      data = dscores,
      color = questionnaire,
      xlab = "Prime Shown",
      ylab = "Dscore",
      main = "Primer vs. Dscores")

ggplot(data=dscores,
       aes(x = d_score)) + 
  geom_histogram(fill = "skyblue",
                 col = "black",
                 binwidth = 0.1) + xlim(-0.5,1.5)+
                 labs(title = "Distribution of D-Scores",
                      x = "D-Score",
                      y = "Frequency")+
                 theme_minimal()

ggplot(data=dscores,
       aes(x = d_score)) + 
  geom_histogram(aes(fill = whichPrime),
                 col = "black",
                 binwidth = 0.1,
                 show.legend = FALSE) + xlim(-0.5,1.5)+
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency")+
  theme_classic()+
  facet_wrap(facets = dscores$whichPrime)

ggplot(data=dscores, aes(x= whichPrime, y = d_score)) +
  geom_boxplot(outlier.shape=1, aes(fill = whichPrime))+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Score")+
  theme_classic()+
  theme(legend.position = "none")+
  scale_x_discrete(labels=c("CisHet"="CisHet", "Control"="Control", "Queer"="Queer"))

ggplot(data = dscores, aes(x=questionnaire, y=d_score)) +
  geom_point()+
  theme_classic()+
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y= "D-Scores")+
  geom_smooth(method=lm)

ggplot (data=dscores, aes(x=questionnaire)) +
  
  geom_bar(aes(fill=whichPrime),
           color = "black",
           position= "dodge")+
  xlim(0,2.5)

ggplot(data= dscores, aes(x=d_score))+
  xlim(-2,2)+
  
  geom_density(positions="stack",
               aes(fill=whichPrime),
               alpha = 0.5)

myIAT_anova <- aov(dscores$d_score ~ dscores$whichPrime)  

summary(myIAT_anova)

post_hoc_test <- pairwise.t.test(dscores$d_score,
                dscores$whichPrime,
                p.adj = "none")
summary(post_hoc_test)

TukeyHSD(myIAT_anova)

myIAT_cor <- cor.test(dscores$questionnaire, dscores$d_score)


ggplot(data=dscores, aes(x= whichPrime, y = d_score))+
  
  geom_boxplot(outlier.shape = 3, aes(fill = whichPrime), 
               coef = 3,
               size = 1.25,
               color = "black",  
               outlier.size = 3)+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Score")+
  scale_x_discrete(labels=c("CisHet"="CisHet", "Control"="Control", "Queer"="Queer"))+
  theme(legend.position = "none", 
        plot.title = element_text(size = rel(2), face = "bold", hjust = 0.5),
        axis.title.x = element_text(size = rel(1.5), face = "bold"),
        axis.title.y = element_text(size = rel(1.5), face = "bold"),
        axis.text.x = element_text(size = rel(1.5)),
        panel.background = element_rect(fill = "white"),
        panel.grid.major = element_line(color = "lightgray", size = 0.5),
        panel.grid.minor = element_line(color = "lightgray", size = 0.25),
        axis.line = element_line(color = "black", size = 0.5))




