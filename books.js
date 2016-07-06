const kinveyAppID = 'kid_Hk_cHIrI';
const kinveyAppSecret = '2cb4a032eb074ab796acfa754c97a8ea';
const kinveyBaseURL = 'http://baas.kinvey.com/';

function showView(viewId) {
    $("main > section").hide();

    $('#'+ viewId).show()
}

function showHideNavigationLinks() {
    let loggedLink = sessionStorage.authToken != null;
    if(loggedLink){
        $('#linkHome').show();
        $('#linkLogin').hide();
        $('#linkRegister').show();
        $('#linkListBooks').show();
        $('#linkCreateBook').show();
        $('#linkLogout').show();
    }else{
        $('#linkHome').show();
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListBooks').hide();
        $('#linkCreateBook').hide();
        $('#linkLogout').hide();
    }
}

function showHomeView() {
    showView('viewHome');
}

function showLoginView() {
    showView('viewLogin');
}

function login() {
    $.ajax({
        method: "POST",
        url: kinveyBaseURL + "user/" + kinveyAppID + "/login",
        data: {
            username: $('#loginUser').val,
            password: $('#loginPass').val
        },
        headers: btoa(kinveyAppID + ":" + kinveyAppSecret),
        success: loginSuccess,
        error: showAjaxError
    });

    function loginSuccess(data, status) {
        sessionStorage.authToken = data._kmd.authtoken
        showListBooksView()
        showHideNavigationLinks()
        showInfo("Login successful")
    }
}

function showInfo(mesageText) {
    $('#infoBox').text(mesageText).show().delay(3000).fadeOut()
}
function showAjaxError(data,status){
    let errorMsg = "Error:" + JSON.stringify(data);
    $('#errorBox').text(errorMsg).show();
}


function showRegisterView() {
    showView('viewRegister');
}
function register() {
    
}
function showListBooksView() {
    showView('viewListBooks');
}

function showCreateBookView() {
    showView('viewCreateBook');
}

function createBook() {

}

function logout() {
    alert('logout');
    showHomeView();
}

$(function () {
    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkListBooks').click(showListBooksView);
    $('#linkCreateBook').click(showCreateBookView);
    $('#linkLogout').click(logout);

    $('#buttonLogin').click(login);
    $('#buttonRegister').click(register);
    $('#buttonCreateBook').click(createBook);
    
    showHomeView();
    showHideNavigationLinks();
});