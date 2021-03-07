package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns={"/UrlAnswerServlet"})
public class UrlAnswerServlet extends HttpServlet {

 static int answerButtonCountUpValue;
 static String[] response_answer = {"A", "B", "C", "D", "E"};

 private static final long serialVersionUID = 1L;

public UrlAnswerServlet() {
 super();
	                       }

public void init(ServletConfig config) throws ServletException{
 super.init(config);
 answerButtonCountUpValue = 0;
	                                                            }

protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
 try {
 //パラメータ取得
 String input_answer = request.getParameter("answer");
 //doGet()が呼ばれた回数をカウント
 answerButtonCountUpValue++;
 Map<Integer, String> QA = new HashMap<>();
 QA.put(answerButtonCountUpValue, response_answer[(answerButtonCountUpValue - 1)]);

 //以下不明点！！！
 //はじめはJSONでの通信をやってみようとしていたのだけどうまくいかず
 //とあるサイトから引っ張ってきたコードからJSON関連のコードを消してPrintWriterを残したら
 //動いたので謎・・・
 //仕組みがよくわかっていない
 //あと正誤判定が不安定
 //正しく動くこともあれば正しく動かないこともある

 //ヘッダ設定
 response.setContentType("text/html; charset= UTF-8");
 //pwオブジェクト
 PrintWriter pw = response.getWriter();
 if(input_answer == (QA.get(answerButtonCountUpValue))) {
 pw.print("正解です。");
 } else {
 pw.print("不正解です。");
         }
 //クローズ
 pw.close();
 } catch(Exception e) {
 e.printStackTrace();
                       }
                                                                                                                      }
}