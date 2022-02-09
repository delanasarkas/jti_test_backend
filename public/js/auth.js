const signIn = () => {
    let button = $('#btn-signin');
    let buttonLoader = $('#btn-loader');

    button.addClass( "d-none" );
    buttonLoader.removeClass( "d-none" );

    // GO TO GOOGLE OAUTH2
    window.location.href = "/login/auth/google";
}