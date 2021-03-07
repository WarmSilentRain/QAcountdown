var timerID;
var setTime = 600;
var answerButtonCountUpValue = 0;


$(function() {
//「スタートボタン」をクリックしたときのイベントリスナー
//まずはカウントダウンを開始している10分は600秒なのでこれをもとに処理
$("#startButton").on("click", function() {
 timerID = setInterval(function(){
 if(setTime <= 0) {
 clearInterval(timerID);
 $("#time").html("00:00:00");
 } else {
 setTime -= 0.01;
 var min = Math.floor(setTime / 60);
 var sec = Math.floor(setTime % 60);
 var milli = Math.floor((setTime - Math.floor(setTime)) * 100);
 $("#time").html((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) + ":" + (milli < 10 ? "0" + milli : milli));
        }
                                   }, 10);

$("#title").html("");
$("#question").html("アルファベットの最初の一文字を大文字で答えてください。");
$("<input>", {
 type: "text",
 id  : "input",
              }).appendTo("#input_answer");
$("#startButton").remove();
$("p").append("<button id=\"answerButton\"></button>");
$("#answerButton").html("答える");
                                          });

//UrlAnswerServletと$Ajaxで関わりがあるのはここだけ
//「答えるボタン」をクリックした時のイベントリスナー
$("p").on("click", "#answerButton", function() {
$.ajax({
     type    : "GET",
scriptCharset: "UTF-8",
     url     : "http://localhost:8080/QAcountdown/UrlAnswerServlet",
     data    : {answer : $("#input").val()}
		}).done(function(data) {
answerButtonCountUpValue += 1;
if(answerButtonCountUpValue < 5) {
$("#answer").html(data);
$("#answerButton").remove();
$("p").append("<button id=\"nextButton\"></button>");
$("#nextButton").html("次へ");
} else if (answerButtonCountUpValue == 5) {
$("#answer").html(data);
$("#answerButton").remove();
$("p").append("<button id=\"nextButton\"></button>");
$("#nextButton").html("終える");
                                           }
	     }).fail(function() {
		    alert("読み込み失敗");
		                     });
                                                });

//「答えるボタン」をクリックしてできたものに問題を追加するだけ
//「次へボタン」or「終えるボタン」をクリックしたときのイベントリスナー
$("p").on("click", "#nextButton", function() {
$("#input").remove();
$("<input>", {
type: "text",
id  : "input",
             }).appendTo("#input_answer");
$("#answer").html("");
$("#nextButton").remove();
$("p").append("<button id=\"answerButton\"></button>");
$("#answerButton").html("答える");
if(answerButtonCountUpValue === 1) {
$("#question").html("アルファベットの二文字目を大文字で答えてください。");
} else if (answerButtonCountUpValue === 2) {
$("#question").html("アルファベットの三文字目を大文字で答えてください。");
} else if (answerButtonCountUpValue === 3) {
$("#question").html("アルファベットの四文字目を大文字で答えてください。");
} else if (answerButtonCountUpValue === 4) {
$("#question").html("アルファベットの五文字目を大文字で答えてください。");
} else if (answerButtonCountUpValue === 5) {
$("#title").html("終了です！");
clearInterval(timerID);
$("#question").html("");
$("#input").remove();
$("#answerButton").remove();
                                            }
                                              });

             });