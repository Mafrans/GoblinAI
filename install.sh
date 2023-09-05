# Download GoblinAI
git clone https://github.com/Mafrans/GoblinAI.git
cd GoblinAI
git pull origin dev
git checkout dev

# Install PythonPoetry if it doesn't already exist
curl -sSL https://install.python-poetry.org | POETRY_HOME=$(pwd)/.lib/poetry python3 -

# Install GoblinAI dependencies
$(pwd)/.lib/poetry/bin/poetry install

# Install client dependencies
cd client
npm ci --prefix client