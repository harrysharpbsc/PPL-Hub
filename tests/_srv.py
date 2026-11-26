"""Start a quiet local web server for the current folder (run tests from src/) unless one is already on that port."""
import socket,threading,http.server,functools,os
def serve(port):
    s=socket.socket()
    try:
        s.connect(('127.0.0.1',port));s.close();return  # something already serves this port
    except OSError: s.close()
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self,*a): pass
    h=http.server.ThreadingHTTPServer(('127.0.0.1',port),functools.partial(Q,directory=os.getcwd()))
    threading.Thread(target=h.serve_forever,daemon=True).start()
