import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class SimpleHttpServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/test", new MyHandler());
        server.setExecutor(null); // 기본 executor 사용
        server.start();
        System.out.println("Server started on port 8000");
    }

    static class MyHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            System.out.println("Method : " + t.getRequestMethod());
            if ("GET".equals(t.getRequestMethod())) {
                // GET 요청 처리
                String response = "Hello, World!";
                t.sendResponseHeaders(200, response.getBytes().length);
                try (OutputStream os = t.getResponseBody()) {
                    os.write(response.getBytes());
                }
            } else if ("POST".equals(t.getRequestMethod())) {
                // POST 요청 처리
                InputStream is = t.getRequestBody();
                String response = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                t.sendResponseHeaders(200, response.getBytes().length);
                try (OutputStream os = t.getResponseBody()) {
                    os.write(response.getBytes());
                }
            }
        }
    }
}
