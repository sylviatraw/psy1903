#### Load Packages & Set Working Directory ------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

setwd("C:/Users/sylvi/Documents/psy1903/stats/final_stats")

#### D-score Function --------------------------------

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

#### Questionnaire Scoring Function ---------------

score_questionnaire <- function (data) {
  json_data <- data[data$trialType == "Questionnaire", "response"]
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  rev_items <- c("question5","question6", "question10", "question12", "question13", "question14")
  for (rev_item in rev_items) {
    questionnaire[, rev_item] <- 4 - questionnaire[, rev_item]
  }
  score <- rowMeans(questionnaire, na.rm = TRUE)
  return(score)
}

#### For Loop ------------------------------------------

directory_path <- "C:/Users/sylvi/Documents/psy1903/osfstorage-archive/"
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)
dscores <- data.frame(matrix(nrow = length(files_list), ncol = 4))

colnames(dscores) <- c("participant_ID", "d_score", "whichPrime", "questionnaire")

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
  rm(tmp)
  i <- i + 1
}

dscores$whichPrime <- as.factor(dscores$whichPrime)

#### ANOVA -------------------------------------------

myIAT_anova <- aov(dscores$d_score ~ dscores$whichPrime) 
summary(myIAT_anova)

#### T-Test ---------------------------------------------

TukeyHSD(myIAT_anova)

#### Correlation ---------------------------------------

myIAT_cor <- cor.test(dscores$questionnaire, dscores$d_score)
myIAT_cor

#### Base R Histogram -------------------------------

hist(dscores$d_score,
     breaks = 30,
     xlim = c(-0.5, 1.5),
     col = "skyblue",
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

#### ggplot Histogram --------------------------------

ggplot(data=dscores,
       aes(x = d_score)) + 
  geom_histogram(fill = "skyblue",
                 col = "black",
                 binwidth = 0.05) + xlim(-0.5,1.5)+
  labs(title = "Distribution of D-Scores",
       x = "D-Score",
       y = "Frequency")+
  theme_minimal()

#### ggplot Histogram by Prime ---------------------

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

#### ggplot Box Plot ----------------------------------

ggplot(data=dscores, aes(x= whichPrime, y = d_score)) +
  geom_boxplot(outlier.shape=1, aes(fill = whichPrime))+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Score")+
  theme_classic()+
  theme(legend.position = "none")+
  scale_x_discrete(labels=c("CisHet"="CisHet", "Control"="Control", "Queer"="Queer"))

#### ggplot Scatter Plot -------------------------------

ggplot(data = dscores, aes(x=questionnaire, y=d_score)) +
  geom_point()+
  theme_classic()+
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y= "D-Scores")+
  geom_smooth(method=lm)

#### ggplot Custom Theme ---------------------------

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


