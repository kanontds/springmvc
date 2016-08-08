package cn.servlet.tds;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Administrator on 2016/7/13.
 */
@WebServlet("/tdsservlet")
public class TdsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public TdsServlet(){
        super();
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
         doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
         response.setCharacterEncoding("GBK");
        response.getWriter().write("this is servlet!");
    }
}
