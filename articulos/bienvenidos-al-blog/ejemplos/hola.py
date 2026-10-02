import json

mensaje = {"comunidad": "Cloud Native Perú", "estado": "ok"}
print(json.dumps(mensaje, ensure_ascii=False))
