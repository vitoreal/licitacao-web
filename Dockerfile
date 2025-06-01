# Dockerfile - Ambiente de Desenvolvimento Quasar (via Docker)
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Instala o Quasar CLI globalmente
RUN npm install -g @quasar/cli

# Comando padrão ao iniciar o container
CMD ["bash"]
