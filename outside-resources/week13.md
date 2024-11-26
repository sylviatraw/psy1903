# Outside Resources Log - Week 13

## AI Prompts
* how do I calculate score for an iat
* what is wrong with this r code: 
```r
theme(legend.position = "none", 
        plot.title = element_text(size = rel(2),
        axis.text.x = element_text(size = rel(1.5), colour = "whichPrime")))
```
* how do I tell R to exclude the legend when making a histogram using ggplot2
* what do I have to do to fix this code: 
```r
ggplot(data=dscores, aes(x= whichPrime, y = d_score))+
  
  geom_boxplot(outlier.shape=1, aes(fill = whichPrime))+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Score")+
  scale_x_discrete(labels=c("CisHet"="CisHet", "Control"="Control", "Queer"="Queer"))+
  theme(legend.position = "none", 
        plot.title = element_text(size = rel(2),
        axis.text.x = element_text(size = rel(1.5), colour = "whichPrime")))
```
* I keep getting this error message: 
```r
Error in element_text(size = rel(2), panel.background = element_rect(fill = "white"),  : 
  unused arguments (panel.background = element_rect(fill = "white"), panel.grid.major = element_line(color = "lightgray", size = 0.5), panel.grid.minor = element_line(color = "lightgray", size = 0.25)) 
```
even though my code is:
```r
ggplot(data=dscores, aes(x= whichPrime, y = d_score))+
  
  geom_boxplot(outlier.shape=1, aes(fill = whichPrime))+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Score")+
  scale_x_discrete(labels=c("CisHet"="CisHet", "Control"="Control", "Queer"="Queer"))+
  theme(legend.position = "none", 
        plot.title = element_text(size = rel(2),
        axis.text.x = element_text(size = rel(1.5)),
        panel.background = element_rect(fill = "white"),
        panel.grid.major = element_line(color = "lightgray", size = 0.5),
        panel.grid.minor = element_line(color = "lightgray", size = 0.25)))
```
why is this happening?
* how can I add whiskers to my boxplot in r
* how do I use the theme part of ggplot to make my title bold and underlined
* now how do I make the title centered above the graph
* how do I make the outlines and whiskers of my boxplot thicker

## Outside sites
* None