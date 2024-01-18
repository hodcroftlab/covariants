setwd("C:/Users/Emma/wsl/corona/ncov/data")
meta <- read.csv("downloaded_gisaid.tsv", as.is=T, sep="\t")
reg_coun <- cbind(meta$region, meta$country)

uniqs <- unique(reg_coun)
regions <- as.data.frame(uniqs[order(uniqs[,1]),])
colnames(regions) <- c("region", "country")

#write.table("../../covariants/scripts/region_country.tsv", sep="\t", quote=F, row.names=F)

#possibly the hackiest way to generate a JSON in the history of man.

regs <- c()
cuns <- c()
tog <- c()

for (reg in unique(regions$region)) {
    quotreg <- paste("\"",reg,"\"", sep="", collapse="")
    regs <- c(regs, quotreg)
    lst <- paste("\"",paste(regions[which(regions$region == reg), "country"], collapse="\",\""),"\"",collapse="",sep="")
    cuns <- c(cuns, lst)
    entry <- paste("\t",quotreg," : [",lst,"]", sep="", collapse="")
    tog <- c(tog, entry)
}

final <- paste("{", paste(tog,collapse=",\n"), "}", sep="\n")

write.table(final, "../../covariants/web/public/data/region_country.json", quote=F, row.names=F, col.names=F)
