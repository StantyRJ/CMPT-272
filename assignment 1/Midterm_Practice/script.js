function moreInfo()
{
    $(".moreinfo").append('<p class="extra">Hobbies: soccer, basketball, video games, etc.</p>')
    $(".moreinfo").append('<p class="extra">Birthday: December 1st, 2016</p>')
    $(".moreinfo").append('<p class="extra">Quote of the day: Whats poppin Logangsters -Logan Paul 2016</p>')
    $("#showinfo").hide()
    $("#hideinfo").show()
    $("#hideinfo").css("margin","auto")
}

function hideInfo()
{
    $("#hideinfo").hide()
    $(".extra").remove()
    $("#showinfo").show()
}