const handleAuthentication = (email, emailVerified) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setIsAdmin(email === "admin@ethicalspectacle.com");
    setIsEmailVerified(emailVerified);

    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isEmailVerified", emailVerified);
};