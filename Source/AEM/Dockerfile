FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
LABEL Author="Shreedhar Patil"

COPY *.sln .
COPY "SPS.AEM.Web/*.csproj" "./SPS.AEM.Web/"
COPY "SPS.AEM.Database/*.csproj" "./SPS.AEM.Database/"
COPY "SPS.AEM.Repository/*.csproj" "./SPS.AEM.Repository/"
COPY "SPS.AEM.Shared/*.csproj" "./SPS.AEM.Shared/"
RUN dotnet restore "./SPS.AEM.Web/SPS.AEM.Web.csproj"
RUN dotnet restore "./SPS.AEM.Database/SPS.AEM.Database.csproj"
RUN dotnet restore "./SPS.AEM.Repository/SPS.AEM.Repository.csproj"
RUN dotnet restore "./SPS.AEM.Shared/SPS.AEM.Shared.csproj"

COPY . .
RUN dotnet publish "./SPS.AEM.Web/SPS.AEM.Web.csproj" -c Release -o /pub --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:3.1
ENV ASPNETCORE_URLS=http://*:5000
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 5000
WORKDIR /app
COPY --from=build /pub ./
ENTRYPOINT ["dotnet", "SPS.AEM.Web.dll"]