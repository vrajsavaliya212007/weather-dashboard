import { createContext, useContext, useEffect, useState } from "react";

import { useSettings } from "./SettingsContext";

const LanguageContext = createContext(null);

// ========================================
// TRANSLATIONS
// ========================================

const translations = {
  // ========================================
  // ENGLISH
  // ========================================

  en: {
    // Navigation

    weatherDashboard: "Weather Dashboard",
    mainMenu: "Main Menu",
    adminBadge: "ADMIN",
    logoutSuccessful: "Logged out successfully",
    unableToLogout: "Unable to logout",

    dashboard: "Weather Dashboard",
    settings: "Settings",
    favorites: "Favorites",
    notifications: "Notifications",
    admin: "Admin Dashboard",
    search: "Search",
    weather: "Weather",
    profile: "Profile",
    weatherNews: "Weather News",
    adminPanel: "Admin Panel",
    analytics: "Analytics",

    // General
    loading: "Loading...",
    refresh: "Refresh",
    refreshing: "Refreshing...",
    saveSettings: "Save Settings",
    delete: "Delete",
    logout: "Logout",
    searchCity: "Search city...",
    forecast: "Forecast",
    cancel: "Cancel",
    close: "Close",
    save: "Save",
    update: "Update",
    submit: "Submit",
    back: "Back",
    next: "Next",
    previous: "Previous",
    yes: "Yes",
    no: "No",
    confirm: "Confirm",
    viewMore: "View More",
    viewDetails: "View Details",
    noData: "No data available",
    error: "Error",
    success: "Success",

    // Dashboard
    goodToSeeYou: "Good to see you",
    dashboardDescription:
      "Your personalized weather dashboard with real-time conditions and forecasts.",
    exploreMoreWeather: "Explore More Weather",
    exploreMoreWeatherDescription:
      "Search for weather information from cities around the world.",
    weatherInformation: "Weather Information",
    weatherInformationDescription:
      "Detailed information about the current weather conditions.",
    weatherDetails: "Weather Details",
    weatherDetailsDescription:
      "Detailed weather information for your current location.",
    latestUpdates: "Latest Updates",
    latestUpdatesDescription:
      "Stay updated with the latest weather information.",
    savedLocations: "Saved Locations",
    savedLocationsDescription: "Your favorite weather locations.",
    recentActivity: "Recent Activity",
    recentActivityDescription: "Your latest weather activity.",
    weatherSummary: "Weather Summary",
    weatherSummaryDescription:
      "A quick overview of your current weather conditions.",
    upcomingForecast: "Upcoming Forecast",
    upcomingForecastDescription: "Weather conditions for the upcoming hours.",
    liveForecast: "Live Forecast",
    currentConditions: "Current Conditions",
    currentTemperature: "Current Temperature",
    feelsLike: "Feels Like",
    temperature: "Temperature",
    precipitation: "Precipitation",
    chanceOfRain: "Chance of Rain",
    dewPoint: "Dew Point",
    uvIndex: "UV Index",
    sunriseTime: "Sunrise",
    sunsetTime: "Sunset",
    latitude: "Latitude",
    longitude: "Longitude",
    exploreCities: "Explore Cities",
    latestUpdatesLabel: "Latest Updates",
    savedLocationsLabel: "Saved Locations",
    recentSearchesLabel: "Recent Searches",

    // Weather
    currentLocation: "Current Location",
    searchWeather: "Search Weather",
    hourlyForecast: "Hourly Forecast",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    visibility: "Visibility",
    sunrise: "Sunrise",
    sunset: "Sunset",
    minTemp: "Min Temp",
    maxTemp: "Max Temp",
    clouds: "Clouds",
    windDirection: "Wind Direction",
    pressureUnit: "hPa",
    visibilityUnit: "km",
    currentWeather: "Current Weather",
    weatherHighlights: "Weather Highlights",
    airQuality: "Air Quality",
    airPollution: "Air Pollution",
    windSpeed: "Wind Speed",
    windGust: "Wind Gust",
    coordinates: "Coordinates",
    lightRain: "Light Rain",
    moderateRain: "Moderate Rain",
    heavyRain: "Heavy Rain",
    clearSky: "Clear Sky",
    scatteredClouds: "Scattered Clouds",
    brokenClouds: "Broken Clouds",
    overcastClouds: "Overcast Clouds",
    thunderstorm: "Thunderstorm",
    snow: "Snow",
    mist: "Mist",
    fog: "Fog",
    haze: "Haze",

    // Settings
    customizeExperience: "Customize your SkyCast experience.",
    appearance: "Appearance",
    temperatureUnit: "Temperature Unit",
    windSpeedUnit: "Wind Speed Unit",
    language: "Language",
    weatherNotifications: "Weather Notifications",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    systemDefault: "System Default",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kilometersPerHour: "Kilometers per hour",
    milesPerHour: "Miles per hour",
    settingsSaved: "Settings saved successfully",

    // Notifications
    noNotifications: "No Notifications",
    markAsRead: "Mark as read",
    markAllAsRead: "Mark all as read",
    notificationsDescription: "Weather alerts and system notifications.",
    unread: "unread",
    notification: "notification",
    notificationPlural: "notifications",
    loadingNotifications: "Loading notifications...",
    youAreAllCaughtUp: "You are all caught up!",
    newNotification: "NEW",
    markRead: "Mark Read",
    notificationMarkedRead: "Notification marked as read",
    allNotificationsMarkedRead: "All notifications marked as read",
    notificationDeleted: "Notification deleted",
    unableToUpdateNotification: "Unable to update notification",
    unableToUpdateNotifications: "Unable to update notifications",
    unableToDeleteNotification: "Unable to delete notification",

    // Profile
    myProfile: "My Profile",
    manageProfile: "Manage your personal information and account.",
    loadingProfile: "Loading Profile...",
    profileLoadError: "Unable to load profile.",
    personalInformation: "Personal Information",
    updateProfile: "Update Profile",
    profileUpdated: "Profile updated successfully",
    uploadPhoto: "Upload Photo",
    changePhoto: "Change Photo",
    name: "Name",
    email: "Email",
    phone: "Phone",
    bio: "Bio",
    city: "City",
    country: "Country",
    saveChanges: "Save Changes",
    user: "User",
    administrator: "Administrator",
    weatherUser: "Weather User",

    // Favorites
    noFavorites: "No Favourite Locations",
    viewWeather: "View Weather",
    favoritesDescription: "Your saved weather locations.",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    addedToFavorites: "Added to favorites",
    removedFromFavorites: "Removed from favorites",

    // Welcome
    welcomeBack: "Welcome back",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    guestUser: "Guest User",
    openProfile: "Open Profile",
    navigation: "Navigation",
    skycastWeather: "SkyCast Weather",

    // Admin
    adminDashboard: "Admin Dashboard",
    administratorPanel: "Administrator Panel",
    adminDescription:
      "Manage users, monitor SkyCast activity, control weather news and communicate with your users from one place.",
    refreshDashboard: "Refresh Dashboard",
    communicationCenter: "Communication Center",
    communicationDescription:
      "Send important announcements and alerts to SkyCast users.",
    contentManagement: "Content Management",
    contentDescription:
      "Manage weather and environmental news displayed to users.",
    userAdministration: "User Administration",
    userAdministrationDescription: "Manage accounts, roles and access.",
    loadingAdminDashboard: "Loading Admin Dashboard...",
    preparingAdminDashboard: "Preparing platform analytics and user data.",
    deleteUserConfirm: "Delete this user permanently?",
    unableToLoadAdminData: "Unable to load admin data",
    unableToUpdateUserRole: "Unable to update user role",
    unableToUpdateUserStatus: "Unable to update user status",
    unableToDeleteUser: "Unable to delete user",
    userRoleUpdated: "User role updated successfully",
    userStatusUpdated: "User status updated successfully",
    userDeleted: "User deleted successfully",
    users: "Users",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    blockedUsers: "Blocked Users",
    adminUsers: "Admin Users",
    userRole: "User Role",
    userStatus: "User Status",
    active: "Active",
    blocked: "Blocked",
    adminRole: "Admin",
    userRoleLabel: "User",
    actions: "Actions",

    // Analytics
    weatherAnalytics: "Weather Analytics",
    analyticsDescription: "Weather history and statistics from your activity.",
    temperatureTrend: "Temperature Trend",
    temperatureTrendDescription:
      "Temperature changes from your recorded weather searches.",
    recentSearches: "Recent Searches",
    recentSearchesDescription: "Your recent weather search history.",
    noWeatherHistory: "No Weather History",
    noWeatherHistoryDescription:
      "Search for some cities and your weather activity will appear here.",
    totalSearches: "Total Searches",
    uniqueCities: "Unique Cities",
    averageTemperature: "Average Temperature",
    mostSearchedCity: "Most Searched City",
    history: "History",
    date: "Date",
    weatherCondition: "Weather Condition",

    // News
    news: "News",
    latestWeatherNews: "Latest weather, climate and environmental news.",
    noNewsFound: "No News Found",
    tryAnotherSearch: "Try another search keyword or category.",
    showingArticles: "Showing",
    articles: "articles",
    category: "Category",
    weatherCategory: "Weather",
    climateCategory: "Climate",
    stormCategory: "Storm",
    rainCategory: "Rain",
    environmentCategory: "Environment",
    searchWeatherNews: "Search weather news...",
    read: "Read",
    readMore: "Read More",
    latestNews: "Latest News",

    // Auth
    login: "Login",
    register: "Register",
    emailAddress: "Email Address",
    password: "Password",
    enterPassword: "Enter Password",
    rememberMe: "Remember Me",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    alreadyAccount: "Already have an account?",
    loginSuccessful: "Login Successful",
    loginFailed: "Login Failed",
    registrationSuccessful: "Registration Successful",
    welcomeBackTitle: "Welcome Back",
    loginToContinue: "Login to continue to SkyCast",
    sendResetLink: "Send Reset Link",
    backToLogin: "Back To Login",
    forgotPasswordTitle: "Forgot Password",
    receivePasswordResetLink: "Receive password reset link",
    resetPassword: "Reset Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    passwordResetSuccessful: "Password reset successful",
    passwordChangedSuccessfully: "Password changed successfully",

    // Search
    searchResults: "Search Results",
    searchForCity: "Search for a city",
    enterCityName: "Enter city name",
    noSearchResults: "No search results found",
    searchFailed: "Search failed",
    searching: "Searching...",

    // Common toast/error messages
    unableToLoad: "Unable to load data.",
    unableToSave: "Unable to save changes.",
    somethingWentWrong: "Something went wrong.",
    operationSuccessful: "Operation successful.",
  },

  // ========================================
  // GUJARATI
  // ========================================

  gu: {
    weatherDashboard: "હવામાન ડેશબોર્ડ",
    mainMenu: "મુખ્ય મેનુ",
    adminBadge: "એડમિન",
    logoutSuccessful: "સફળતાપૂર્વક લૉગઆઉટ થયું",
    unableToLogout: "લૉગઆઉટ કરી શકાયું નથી",
    // Navigation
    dashboard: "હવામાન ડેશબોર્ડ",
    settings: "સેટિંગ્સ",
    favorites: "મનપસંદ",
    notifications: "નોટિફિકેશન",
    admin: "એડમિન ડેશબોર્ડ",
    search: "શોધો",
    weather: "હવામાન",
    profile: "પ્રોફાઇલ",
    weatherNews: "હવામાન સમાચાર",
    adminPanel: "એડમિન પેનલ",
    analytics: "એનાલિટિક્સ",

    // General
    loading: "લોડ થઈ રહ્યું છે...",
    refresh: "રિફ્રેશ",
    refreshing: "રિફ્રેશ થઈ રહ્યું છે...",
    saveSettings: "સેટિંગ્સ સાચવો",
    delete: "ડિલીટ",
    logout: "લૉગઆઉટ",
    searchCity: "શહેર શોધો...",
    forecast: "આગાહી",
    cancel: "રદ કરો",
    close: "બંધ કરો",
    save: "સાચવો",
    update: "અપડેટ કરો",
    submit: "સબમિટ કરો",
    back: "પાછા",
    next: "આગળ",
    previous: "પાછળ",
    yes: "હા",
    no: "ના",
    confirm: "પુષ્ટિ કરો",
    viewMore: "વધુ જુઓ",
    viewDetails: "વિગતો જુઓ",
    noData: "કોઈ ડેટા ઉપલબ્ધ નથી",
    error: "ભૂલ",
    success: "સફળતા",

    // Dashboard
    goodToSeeYou: "તમને ફરી જોઈને આનંદ થયો",
    dashboardDescription:
      "રીઅલ-ટાઇમ હવામાન અને આગાહી સાથે તમારું વ્યક્તિગત હવામાન ડેશબોર્ડ.",
    exploreMoreWeather: "વધુ હવામાન જુઓ",
    exploreMoreWeatherDescription: "દુનિયાના વિવિધ શહેરોની હવામાન માહિતી શોધો.",
    weatherInformation: "હવામાન માહિતી",
    weatherInformationDescription:
      "વર્તમાન હવામાન પરિસ્થિતિ વિશે વિગતવાર માહિતી.",
    weatherDetails: "હવામાનની વિગતો",
    weatherDetailsDescription: "તમારા વર્તમાન સ્થાનની વિગતવાર હવામાન માહિતી.",
    latestUpdates: "તાજેતરના અપડેટ્સ",
    latestUpdatesDescription: "તાજેતરની હવામાન માહિતીથી અપડેટ રહો.",
    savedLocations: "સાચવેલા સ્થાનો",
    savedLocationsDescription: "તમારા મનપસંદ હવામાન સ્થળો.",
    recentActivity: "તાજેતરની પ્રવૃત્તિ",
    recentActivityDescription: "તમારી તાજેતરની હવામાન પ્રવૃત્તિ.",
    weatherSummary: "હવામાન સારાંશ",
    weatherSummaryDescription: "તમારા વર્તમાન હવામાનની ઝડપી માહિતી.",
    upcomingForecast: "આગામી આગાહી",
    upcomingForecastDescription: "આગામી કલાકો માટેની હવામાન પરિસ્થિતિ.",
    liveForecast: "લાઇવ આગાહી",
    currentConditions: "વર્તમાન પરિસ્થિતિ",
    currentTemperature: "વર્તમાન તાપમાન",
    feelsLike: "અનુભવાતું તાપમાન",
    temperature: "તાપમાન",
    precipitation: "વરસાદ",
    chanceOfRain: "વરસાદની શક્યતા",
    dewPoint: "ઝાકળ બિંદુ",
    uvIndex: "UV ઇન્ડેક્સ",
    sunriseTime: "સૂર્યોદય",
    sunsetTime: "સૂર્યાસ્ત",
    latitude: "અક્ષાંશ",
    longitude: "રેખાંશ",
    exploreCities: "શહેરો શોધો",
    latestUpdatesLabel: "તાજેતરના અપડેટ્સ",
    savedLocationsLabel: "સાચવેલા સ્થાનો",
    recentSearchesLabel: "તાજેતરની શોધ",

    // Weather
    currentLocation: "વર્તમાન સ્થાન",
    searchWeather: "હવામાન શોધો",
    hourlyForecast: "કલાકવાર આગાહી",
    humidity: "ભેજ",
    wind: "પવન",
    pressure: "દબાણ",
    visibility: "દૃશ્યતા",
    sunrise: "સૂર્યોદય",
    sunset: "સૂર્યાસ્ત",
    minTemp: "લઘુત્તમ તાપમાન",
    maxTemp: "મહત્તમ તાપમાન",
    clouds: "વાદળો",
    windDirection: "પવનની દિશા",
    pressureUnit: "hPa",
    visibilityUnit: "કિમી",
    currentWeather: "વર્તમાન હવામાન",
    weatherHighlights: "હવામાનની વિગતો",
    airQuality: "હવાની ગુણવત્તા",
    airPollution: "હવાનું પ્રદૂષણ",
    windSpeed: "પવનની ઝડપ",
    windGust: "પવનનો ઝોકો",
    coordinates: "કોઓર્ડિનેટ્સ",
    lightRain: "હળવો વરસાદ",
    moderateRain: "મધ્યમ વરસાદ",
    heavyRain: "ભારે વરસાદ",
    clearSky: "સ્વચ્છ આકાશ",
    scatteredClouds: "છૂટાછવાયા વાદળો",
    brokenClouds: "વિખરાયેલા વાદળો",
    overcastClouds: "ઘેરા વાદળો",
    thunderstorm: "વાવાઝોડું",
    snow: "બરફવર્ષા",
    mist: "ઝાકળ",
    fog: "ધુમ્મસ",
    haze: "ધૂંધ",

    // Settings
    customizeExperience: "તમારા SkyCast અનુભવને કસ્ટમાઇઝ કરો.",
    appearance: "દેખાવ",
    temperatureUnit: "તાપમાનનું એકમ",
    windSpeedUnit: "પવનની ઝડપનું એકમ",
    language: "ભાષા",
    weatherNotifications: "હવામાન નોટિફિકેશન",
    darkMode: "ડાર્ક મોડ",
    lightMode: "લાઇટ મોડ",
    systemDefault: "સિસ્ટમ ડિફૉલ્ટ",
    celsius: "સેલ્સિયસ",
    fahrenheit: "ફેરનહાઇટ",
    kilometersPerHour: "કિલોમીટર પ્રતિ કલાક",
    milesPerHour: "માઇલ પ્રતિ કલાક",
    settingsSaved: "સેટિંગ્સ સફળતાપૂર્વક સાચવાઈ ગઈ",

    // Notifications
    noNotifications: "કોઈ નોટિફિકેશન નથી",
    markAsRead: "વાંચેલું કરો",
    markAllAsRead: "બધાને વાંચેલા કરો",
    notificationsDescription: "હવામાન એલર્ટ અને સિસ્ટમ નોટિફિકેશન.",
    unread: "વાંચ્યા વગરના",
    notification: "નોટિફિકેશન",
    notificationPlural: "નોટિફિકેશન",
    loadingNotifications: "નોટિફિકેશન લોડ થઈ રહ્યા છે...",
    youAreAllCaughtUp: "તમે બધા નોટિફિકેશન જોઈ લીધા છે!",
    newNotification: "નવું",
    markRead: "વાંચેલું કરો",
    notificationMarkedRead: "નોટિફિકેશન વાંચેલું કરવામાં આવ્યું",
    allNotificationsMarkedRead: "બધા નોટિફિકેશન વાંચેલા કરવામાં આવ્યા",
    notificationDeleted: "નોટિફિકેશન ડિલીટ કરવામાં આવ્યું",
    unableToUpdateNotification: "નોટિફિકેશન અપડેટ કરી શકાયું નથી",
    unableToUpdateNotifications: "નોટિફિકેશન અપડેટ કરી શકાયા નથી",
    unableToDeleteNotification: "નોટિફિકેશન ડિલીટ કરી શકાયું નથી",

    // Profile
    myProfile: "મારી પ્રોફાઇલ",
    manageProfile: "તમારી વ્યક્તિગત માહિતી અને એકાઉન્ટ મેનેજ કરો.",
    loadingProfile: "પ્રોફાઇલ લોડ થઈ રહી છે...",
    profileLoadError: "પ્રોફાઇલ લોડ કરી શકાઈ નથી.",
    personalInformation: "વ્યક્તિગત માહિતી",
    updateProfile: "પ્રોફાઇલ અપડેટ કરો",
    profileUpdated: "પ્રોફાઇલ સફળતાપૂર્વક અપડેટ થઈ.",
    uploadPhoto: "ફોટો અપલોડ કરો",
    changePhoto: "ફોટો બદલો",
    name: "નામ",
    email: "ઈમેલ",
    phone: "ફોન",
    bio: "બાયો",
    city: "શહેર",
    country: "દેશ",
    saveChanges: "ફેરફારો સાચવો",
    user: "યુઝર",
    administrator: "એડમિનિસ્ટ્રેટર",
    weatherUser: "હવામાન યુઝર",

    // Favorites
    noFavorites: "કોઈ મનપસંદ સ્થાન નથી",
    viewWeather: "હવામાન જુઓ",
    favoritesDescription: "તમારા સાચવેલા હવામાન સ્થળો.",
    addToFavorites: "મનપસંદમાં ઉમેરો",
    removeFromFavorites: "મનપસંદમાંથી દૂર કરો",
    addedToFavorites: "મનપસંદમાં ઉમેરવામાં આવ્યું",
    removedFromFavorites: "મનપસંદમાંથી દૂર કરવામાં આવ્યું",

    // Welcome
    welcomeBack: "તમને ફરી જોઈને આનંદ થયો",
    openMenu: "મેનુ ખોલો",
    closeMenu: "મેનુ બંધ કરો",
    guestUser: "ગેસ્ટ યુઝર",
    openProfile: "પ્રોફાઇલ ખોલો",
    navigation: "નેવિગેશન",
    skycastWeather: "SkyCast હવામાન",

    // Admin
    adminDashboard: "એડમિન ડેશબોર્ડ",
    administratorPanel: "એડમિનિસ્ટ્રેટર પેનલ",
    adminDescription:
      "યુઝર્સ મેનેજ કરો, SkyCastની પ્રવૃત્તિ મોનિટર કરો, હવામાન સમાચાર નિયંત્રિત કરો અને એક જ જગ્યાએથી યુઝર્સ સાથે વાતચીત કરો.",
    refreshDashboard: "ડેશબોર્ડ રિફ્રેશ કરો",
    communicationCenter: "કમ્યુનિકેશન સેન્ટર",
    communicationDescription:
      "SkyCast યુઝર્સને મહત્વપૂર્ણ જાહેરાતો અને એલર્ટ મોકલો.",
    contentManagement: "કન્ટેન્ટ મેનેજમેન્ટ",
    contentDescription:
      "યુઝર્સને બતાવવામાં આવતા હવામાન અને પર્યાવરણ સંબંધિત સમાચાર મેનેજ કરો.",
    userAdministration: "યુઝર એડમિનિસ્ટ્રેશન",
    userAdministrationDescription: "એકાઉન્ટ, રોલ અને ઍક્સેસ મેનેજ કરો.",
    loadingAdminDashboard: "એડમિન ડેશબોર્ડ લોડ થઈ રહ્યું છે...",
    preparingAdminDashboard:
      "પ્લેટફોર્મ એનાલિટિક્સ અને યુઝર ડેટા તૈયાર થઈ રહ્યો છે.",
    deleteUserConfirm: "શું તમે આ યુઝરને કાયમ માટે ડિલીટ કરવા માંગો છો?",
    unableToLoadAdminData: "એડમિન ડેટા લોડ કરી શકાયો નથી",
    unableToUpdateUserRole: "યુઝર રોલ અપડેટ કરી શકાયો નથી",
    unableToUpdateUserStatus: "યુઝર સ્ટેટસ અપડેટ કરી શકાયો નથી",
    unableToDeleteUser: "યુઝર ડિલીટ કરી શકાયો નથી",
    userRoleUpdated: "યુઝર રોલ સફળતાપૂર્વક અપડેટ થયો",
    userStatusUpdated: "યુઝર સ્ટેટસ સફળતાપૂર્વક અપડેટ થયું",
    userDeleted: "યુઝર સફળતાપૂર્વક ડિલીટ થયો",
    users: "યુઝર્સ",
    totalUsers: "કુલ યુઝર્સ",
    activeUsers: "સક્રિય યુઝર્સ",
    blockedUsers: "બ્લોક કરેલા યુઝર્સ",
    adminUsers: "એડમિન યુઝર્સ",
    userRole: "યુઝર રોલ",
    userStatus: "યુઝર સ્ટેટસ",
    active: "સક્રિય",
    blocked: "બ્લોક",
    adminRole: "એડમિન",
    userRoleLabel: "યુઝર",
    actions: "એક્શન",

    // Analytics
    weatherAnalytics: "હવામાન એનાલિટિક્સ",
    analyticsDescription: "તમારી પ્રવૃત્તિના હવામાન ઇતિહાસ અને આંકડાઓ.",
    temperatureTrend: "તાપમાનનો ટ્રેન્ડ",
    temperatureTrendDescription:
      "તમારી નોંધાયેલી હવામાન શોધોમાં તાપમાનના ફેરફારો.",
    recentSearches: "તાજેતરની શોધ",
    recentSearchesDescription: "તમારી તાજેતરની હવામાન શોધનો ઇતિહાસ.",
    noWeatherHistory: "કોઈ હવામાન ઇતિહાસ નથી",
    noWeatherHistoryDescription:
      "કેટલાક શહેરો શોધો અને તમારી હવામાન પ્રવૃત્તિ અહીં દેખાશે.",
    totalSearches: "કુલ શોધ",
    uniqueCities: "અલગ શહેરો",
    averageTemperature: "સરેરાશ તાપમાન",
    mostSearchedCity: "સૌથી વધુ શોધાયેલ શહેર",
    history: "ઇતિહાસ",
    date: "તારીખ",
    weatherCondition: "હવામાનની પરિસ્થિતિ",

    // News
    news: "સમાચાર",
    latestWeatherNews: "તાજેતરના હવામાન, આબોહવા અને પર્યાવરણ સંબંધિત સમાચાર.",
    noNewsFound: "કોઈ સમાચાર મળ્યા નથી",
    tryAnotherSearch: "બીજો સર્ચ કીવર્ડ અથવા કેટેગરી અજમાવો.",
    showingArticles: "બતાવવામાં આવી રહ્યા છે",
    articles: "લેખો",
    category: "કેટેગરી",
    weatherCategory: "હવામાન",
    climateCategory: "આબોહવા",
    stormCategory: "તોફાન",
    rainCategory: "વરસાદ",
    environmentCategory: "પર્યાવરણ",
    searchWeatherNews: "હવામાન સમાચાર શોધો...",
    read: "વાંચો",
    readMore: "વધુ વાંચો",
    latestNews: "તાજેતરના સમાચાર",

    // Auth
    login: "લૉગિન",
    register: "રજિસ્ટર",
    emailAddress: "ઈમેલ એડ્રેસ",
    password: "પાસવર્ડ",
    enterPassword: "પાસવર્ડ દાખલ કરો",
    rememberMe: "મને યાદ રાખો",
    forgotPassword: "પાસવર્ડ ભૂલી ગયા?",
    noAccount: "એકાઉન્ટ નથી?",
    alreadyAccount: "પહેલેથી એકાઉન્ટ છે?",
    loginSuccessful: "લૉગિન સફળ થયું",
    loginFailed: "લૉગિન નિષ્ફળ ગયું",
    registrationSuccessful: "રજિસ્ટ્રેશન સફળ થયું",
    welcomeBackTitle: "ફરી સ્વાગત છે",
    loginToContinue: "SkyCast ચાલુ રાખવા માટે લૉગિન કરો",
    sendResetLink: "રીસેટ લિંક મોકલો",
    backToLogin: "લૉગિન પર પાછા જાઓ",
    forgotPasswordTitle: "પાસવર્ડ ભૂલી ગયા",
    receivePasswordResetLink: "પાસવર્ડ રીસેટ લિંક મેળવો",
    resetPassword: "પાસવર્ડ રીસેટ કરો",
    newPassword: "નવો પાસવર્ડ",
    confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
    passwordResetSuccessful: "પાસવર્ડ સફળતાપૂર્વક રીસેટ થયો",
    passwordChangedSuccessfully: "પાસવર્ડ સફળતાપૂર્વક બદલાયો",

    // Search
    searchResults: "શોધ પરિણામો",
    searchForCity: "શહેર શોધો",
    enterCityName: "શહેરનું નામ દાખલ કરો",
    noSearchResults: "કોઈ શોધ પરિણામ મળ્યું નથી",
    searchFailed: "શોધ નિષ્ફળ ગઈ",
    searching: "શોધી રહ્યા છીએ...",

    // Common
    unableToLoad: "ડેટા લોડ કરી શકાયો નથી.",
    unableToSave: "ફેરફારો સાચવી શકાયા નથી.",
    somethingWentWrong: "કંઈક ખોટું થયું.",
    operationSuccessful: "ઓપરેશન સફળ થયું.",
  },

  // ========================================
  // HINDI
  // ========================================

  hi: {
    weatherDashboard: "मौसम डैशबोर्ड",
    mainMenu: "मुख्य मेनू",
    adminBadge: "एडमिन",
    logoutSuccessful: "सफलतापूर्वक लॉगआउट हुआ",
    unableToLogout: "लॉगआउट नहीं हो सका",
    // Navigation
    dashboard: "मौसम डैशबोर्ड",
    settings: "सेटिंग्स",
    favorites: "पसंदीदा",
    notifications: "सूचनाएं",
    admin: "एडमिन डैशबोर्ड",
    search: "खोजें",
    weather: "मौसम",
    profile: "प्रोफ़ाइल",
    weatherNews: "मौसम समाचार",
    adminPanel: "एडमिन पैनल",
    analytics: "एनालिटिक्स",

    // General
    loading: "लोड हो रहा है...",
    refresh: "रिफ्रेश",
    refreshing: "रिफ्रेश हो रहा है...",
    saveSettings: "सेटिंग्स सेव करें",
    delete: "डिलीट",
    logout: "लॉगआउट",
    searchCity: "शहर खोजें...",
    forecast: "पूर्वानुमान",
    cancel: "रद्द करें",
    close: "बंद करें",
    save: "सेव करें",
    update: "अपडेट करें",
    submit: "सबमिट करें",
    back: "वापस",
    next: "आगे",
    previous: "पिछला",
    yes: "हाँ",
    no: "नहीं",
    confirm: "पुष्टि करें",
    viewMore: "और देखें",
    viewDetails: "विवरण देखें",
    noData: "कोई डेटा उपलब्ध नहीं है",
    error: "त्रुटि",
    success: "सफलता",

    // Dashboard
    goodToSeeYou: "आपको फिर से देखकर अच्छा लगा",
    dashboardDescription:
      "रीयल-टाइम मौसम और पूर्वानुमान के साथ आपका व्यक्तिगत मौसम डैशबोर्ड.",
    exploreMoreWeather: "और मौसम देखें",
    exploreMoreWeatherDescription:
      "दुनिया के अलग-अलग शहरों की मौसम जानकारी खोजें.",
    weatherInformation: "मौसम की जानकारी",
    weatherInformationDescription:
      "वर्तमान मौसम की स्थिति के बारे में विस्तृत जानकारी.",
    weatherDetails: "मौसम का विवरण",
    weatherDetailsDescription: "आपके वर्तमान स्थान की विस्तृत मौसम जानकारी.",
    latestUpdates: "नवीनतम अपडेट",
    latestUpdatesDescription: "नवीनतम मौसम जानकारी से अपडेट रहें.",
    savedLocations: "सेव किए गए स्थान",
    savedLocationsDescription: "आपके पसंदीदा मौसम स्थान.",
    recentActivity: "हाल की गतिविधि",
    recentActivityDescription: "आपकी हाल की मौसम गतिविधि.",
    weatherSummary: "मौसम सारांश",
    weatherSummaryDescription: "आपकी वर्तमान मौसम स्थिति का संक्षिप्त विवरण.",
    upcomingForecast: "आगामी पूर्वानुमान",
    upcomingForecastDescription: "आने वाले घंटों की मौसम स्थिति.",
    liveForecast: "लाइव पूर्वानुमान",
    currentConditions: "वर्तमान स्थिति",
    currentTemperature: "वर्तमान तापमान",
    feelsLike: "महसूस होने वाला तापमान",
    temperature: "तापमान",
    precipitation: "वर्षा",
    chanceOfRain: "बारिश की संभावना",
    dewPoint: "ओस बिंदु",
    uvIndex: "UV इंडेक्स",
    sunriseTime: "सूर्योदय",
    sunsetTime: "सूर्यास्त",
    latitude: "अक्षांश",
    longitude: "देशांतर",
    exploreCities: "शहर खोजें",
    latestUpdatesLabel: "नवीनतम अपडेट",
    savedLocationsLabel: "सेव किए गए स्थान",
    recentSearchesLabel: "हाल की खोजें",

    // Weather
    currentLocation: "वर्तमान स्थान",
    searchWeather: "मौसम खोजें",
    hourlyForecast: "घंटेवार पूर्वानुमान",
    humidity: "नमी",
    wind: "हवा",
    pressure: "दबाव",
    visibility: "दृश्यता",
    sunrise: "सूर्योदय",
    sunset: "सूर्यास्त",
    minTemp: "न्यूनतम तापमान",
    maxTemp: "अधिकतम तापमान",
    clouds: "बादल",
    windDirection: "हवा की दिशा",
    pressureUnit: "hPa",
    visibilityUnit: "किमी",
    currentWeather: "वर्तमान मौसम",
    weatherHighlights: "मौसम की जानकारी",
    airQuality: "हवा की गुणवत्ता",
    airPollution: "वायु प्रदूषण",
    windSpeed: "हवा की गति",
    windGust: "हवा का झोंका",
    coordinates: "निर्देशांक",
    lightRain: "हल्की बारिश",
    moderateRain: "मध्यम बारिश",
    heavyRain: "भारी बारिश",
    clearSky: "साफ आसमान",
    scatteredClouds: "छिटपुट बादल",
    brokenClouds: "टूटे हुए बादल",
    overcastClouds: "घने बादल",
    thunderstorm: "आंधी-तूफान",
    snow: "बर्फबारी",
    mist: "धुंध",
    fog: "कोहरा",
    haze: "धुंधलका",

    // Settings
    customizeExperience: "अपने SkyCast अनुभव को कस्टमाइज़ करें.",
    appearance: "दिखावट",
    temperatureUnit: "तापमान इकाई",
    windSpeedUnit: "हवा की गति इकाई",
    language: "भाषा",
    weatherNotifications: "मौसम सूचनाएं",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    systemDefault: "सिस्टम डिफ़ॉल्ट",
    celsius: "सेल्सियस",
    fahrenheit: "फ़ारेनहाइट",
    kilometersPerHour: "किलोमीटर प्रति घंटा",
    milesPerHour: "मील प्रति घंटा",
    settingsSaved: "सेटिंग्स सफलतापूर्वक सेव हुईं",

    // Notifications
    noNotifications: "कोई सूचना नहीं",
    markAsRead: "पढ़ा हुआ करें",
    markAllAsRead: "सभी को पढ़ा हुआ करें",
    notificationsDescription: "मौसम अलर्ट और सिस्टम सूचनाएं.",
    unread: "अपठित",
    notification: "सूचना",
    notificationPlural: "सूचनाएं",
    loadingNotifications: "सूचनाएं लोड हो रही हैं...",
    youAreAllCaughtUp: "आपने सभी सूचनाएं देख ली हैं!",
    newNotification: "नया",
    markRead: "पढ़ा हुआ करें",
    notificationMarkedRead: "सूचना को पढ़ा हुआ कर दिया गया",
    allNotificationsMarkedRead: "सभी सूचनाओं को पढ़ा हुआ कर दिया गया",
    notificationDeleted: "सूचना डिलीट कर दी गई",
    unableToUpdateNotification: "सूचना अपडेट नहीं हो सकी",
    unableToUpdateNotifications: "सूचनाएं अपडेट नहीं हो सकीं",
    unableToDeleteNotification: "सूचना डिलीट नहीं हो सकी",

    // Profile
    myProfile: "मेरी प्रोफ़ाइल",
    manageProfile: "अपनी व्यक्तिगत जानकारी और अकाउंट मैनेज करें.",
    loadingProfile: "प्रोफ़ाइल लोड हो रही है...",
    profileLoadError: "प्रोफ़ाइल लोड नहीं हो सकी.",
    personalInformation: "व्यक्तिगत जानकारी",
    updateProfile: "प्रोफ़ाइल अपडेट करें",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई",
    uploadPhoto: "फोटो अपलोड करें",
    changePhoto: "फोटो बदलें",
    name: "नाम",
    email: "ईमेल",
    phone: "फोन",
    bio: "बायो",
    city: "शहर",
    country: "देश",
    saveChanges: "बदलाव सेव करें",
    user: "यूज़र",
    administrator: "एडमिनिस्ट्रेटर",
    weatherUser: "मौसम यूज़र",

    // Favorites
    noFavorites: "कोई पसंदीदा स्थान नहीं",
    viewWeather: "मौसम देखें",
    favoritesDescription: "आपके सेव किए गए मौसम स्थान.",
    addToFavorites: "पसंदीदा में जोड़ें",
    removeFromFavorites: "पसंदीदा से हटाएं",
    addedToFavorites: "पसंदीदा में जोड़ दिया गया",
    removedFromFavorites: "पसंदीदा से हटा दिया गया",

    // Welcome
    welcomeBack: "वापसी पर स्वागत है",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    guestUser: "गेस्ट यूज़र",
    openProfile: "प्रोफ़ाइल खोलें",
    navigation: "नेविगेशन",
    skycastWeather: "SkyCast मौसम",

    // Admin
    adminDashboard: "एडमिन डैशबोर्ड",
    administratorPanel: "एडमिनिस्ट्रेटर पैनल",
    adminDescription:
      "यूज़र्स मैनेज करें, SkyCast की गतिविधि मॉनिटर करें, मौसम समाचार नियंत्रित करें और एक ही जगह से यूज़र्स के साथ संवाद करें.",
    refreshDashboard: "डैशबोर्ड रिफ्रेश करें",
    communicationCenter: "कम्युनिकेशन सेंटर",
    communicationDescription:
      "SkyCast यूज़र्स को महत्वपूर्ण घोषणाएं और अलर्ट भेजें.",
    contentManagement: "कंटेंट मैनेजमेंट",
    contentDescription:
      "यूज़र्स को दिखाए जाने वाले मौसम और पर्यावरण संबंधी समाचार मैनेज करें.",
    userAdministration: "यूज़र एडमिनिस्ट्रेशन",
    userAdministrationDescription: "अकाउंट, रोल और एक्सेस मैनेज करें.",
    loadingAdminDashboard: "एडमिन डैशबोर्ड लोड हो रहा है...",
    preparingAdminDashboard:
      "प्लेटफ़ॉर्म एनालिटिक्स और यूज़र डेटा तैयार किया जा रहा है.",
    deleteUserConfirm: "क्या आप इस यूज़र को हमेशा के लिए डिलीट करना चाहते हैं?",
    unableToLoadAdminData: "एडमिन डेटा लोड नहीं हो सका",
    unableToUpdateUserRole: "यूज़र रोल अपडेट नहीं हो सका",
    unableToUpdateUserStatus: "यूज़र स्टेटस अपडेट नहीं हो सका",
    unableToDeleteUser: "यूज़र डिलीट नहीं हो सका",
    userRoleUpdated: "यूज़र रोल सफलतापूर्वक अपडेट हुआ",
    userStatusUpdated: "यूज़र स्टेटस सफलतापूर्वक अपडेट हुआ",
    userDeleted: "यूज़र सफलतापूर्वक डिलीट हुआ",
    users: "यूज़र्स",
    totalUsers: "कुल यूज़र्स",
    activeUsers: "सक्रिय यूज़र्स",
    blockedUsers: "ब्लॉक किए गए यूज़र्स",
    adminUsers: "एडमिन यूज़र्स",
    userRole: "यूज़र रोल",
    userStatus: "यूज़र स्टेटस",
    active: "सक्रिय",
    blocked: "ब्लॉक",
    adminRole: "एडमिन",
    userRoleLabel: "यूज़र",
    actions: "एक्शन",

    // Analytics
    weatherAnalytics: "मौसम एनालिटिक्स",
    analyticsDescription: "आपकी गतिविधि का मौसम इतिहास और आंकड़े.",
    temperatureTrend: "तापमान ट्रेंड",
    temperatureTrendDescription:
      "आपकी रिकॉर्ड की गई मौसम खोजों में तापमान के बदलाव.",
    recentSearches: "हाल की खोजें",
    recentSearchesDescription: "आपकी हाल की मौसम खोज का इतिहास.",
    noWeatherHistory: "कोई मौसम इतिहास नहीं",
    noWeatherHistoryDescription:
      "कुछ शहर खोजें और आपकी मौसम गतिविधि यहां दिखाई देगी.",
    totalSearches: "कुल खोज",
    uniqueCities: "अलग शहर",
    averageTemperature: "औसत तापमान",
    mostSearchedCity: "सबसे अधिक खोजा गया शहर",
    history: "इतिहास",
    date: "तारीख",
    weatherCondition: "मौसम की स्थिति",

    // News
    news: "समाचार",
    latestWeatherNews: "नवीनतम मौसम, जलवायु और पर्यावरण संबंधी समाचार.",
    noNewsFound: "कोई समाचार नहीं मिला",
    tryAnotherSearch: "कोई दूसरा सर्च कीवर्ड या कैटेगरी आज़माएं.",
    showingArticles: "दिखाए जा रहे हैं",
    articles: "लेख",
    category: "कैटेगरी",
    weatherCategory: "मौसम",
    climateCategory: "जलवायु",
    stormCategory: "तूफान",
    rainCategory: "बारिश",
    environmentCategory: "पर्यावरण",
    searchWeatherNews: "मौसम समाचार खोजें...",
    read: "पढ़ें",
    readMore: "और पढ़ें",
    latestNews: "नवीनतम समाचार",

    // Auth
    login: "लॉगिन",
    register: "रजिस्टर",
    emailAddress: "ईमेल एड्रेस",
    password: "पासवर्ड",
    enterPassword: "पासवर्ड दर्ज करें",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    noAccount: "अकाउंट नहीं है?",
    alreadyAccount: "पहले से अकाउंट है?",
    loginSuccessful: "लॉगिन सफल हुआ",
    loginFailed: "लॉगिन असफल हुआ",
    registrationSuccessful: "रजिस्ट्रेशन सफल हुआ",
    welcomeBackTitle: "वापसी पर स्वागत है",
    loginToContinue: "SkyCast जारी रखने के लिए लॉगिन करें",
    sendResetLink: "रीसेट लिंक भेजें",
    backToLogin: "लॉगिन पर वापस जाएं",
    forgotPasswordTitle: "पासवर्ड भूल गए",
    receivePasswordResetLink: "पासवर्ड रीसेट लिंक प्राप्त करें",
    resetPassword: "पासवर्ड रीसेट करें",
    newPassword: "नया पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    passwordResetSuccessful: "पासवर्ड सफलतापूर्वक रीसेट हुआ",
    passwordChangedSuccessfully: "पासवर्ड सफलतापूर्वक बदला गया",

    // Search
    searchResults: "खोज परिणाम",
    searchForCity: "शहर खोजें",
    enterCityName: "शहर का नाम दर्ज करें",
    noSearchResults: "कोई खोज परिणाम नहीं मिला",
    searchFailed: "खोज विफल हुई",
    searching: "खोज रहे हैं...",

    // Common
    unableToLoad: "डेटा लोड नहीं हो सका.",
    unableToSave: "बदलाव सेव नहीं हो सके.",
    somethingWentWrong: "कुछ गलत हो गया.",
    operationSuccessful: "ऑपरेशन सफल हुआ.",
  },
};

const makeReadableKey = (key) => {
  if (!key || typeof key !== "string") {
    return "";
  }
  const readable = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!readable) {
    return "";
  }
  return readable.charAt(0).toUpperCase() + readable.slice(1);
};

export const LanguageProvider = ({ children }) => {
  const { settings } = useSettings();
  const [language, setLanguage] = useState(settings?.language || "en");

  useEffect(() => {
    const nextLanguage = settings?.language || "en";
    if (translations[nextLanguage]) {
      setLanguage(nextLanguage);
    } else {
      setLanguage("en");
    }
  }, [settings?.language]);
  const t = (key) => {
    if (!key) {
      return "";
    }
    const currentTranslations = translations[language] || translations.en;
    if (Object.prototype.hasOwnProperty.call(currentTranslations, key)) {
      return currentTranslations[key];
    }
    if (Object.prototype.hasOwnProperty.call(translations.en, key)) {
      return translations.en[key];
    }
    return makeReadableKey(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
};
