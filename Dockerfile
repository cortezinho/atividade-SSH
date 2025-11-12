# Usa a imagem oficial do Nginx baseada em Alpine, que é leve e segura.
FROM docker.io/library/nginx:alpine

# Define o diretório de trabalho (workdir) para onde o Nginx serve os arquivos.
WORKDIR /usr/share/nginx/html

# Copia o arquivo index.html (e quaisquer outros arquivos HTML/CSS/JS na raiz)
# para o diretório do Nginx.
# Nota: O ponto final "." assume que o Dockerfile está na mesma pasta do index.html.
COPY index.html .
    
# Se houver uma subpasta (como "assets" ou "img"), adicione linhas COPY para elas:
# COPY assets/ assets/

# Expõe a porta 80, a porta padrão do Nginx.
EXPOSE 80

# Comando para iniciar o Nginx em primeiro plano (necessário para containers).
CMD ["nginx", "-g", "daemon off;"]