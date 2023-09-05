# Download GoblinAI
git clone https://github.com/Mafrans/GoblinAI.git
cd GoblinAI
git pull origin dev
git checkout dev

# Install PythonPoetry if it doesn't already exist
if ! type "poetry" > /dev/null; then
  curl -sSL https://install.python-poetry.org | POETRY_HOME=$(pwd)/.lib/poetry python3 -
  export PATH=$HOME/.local/bin:$PATH
  hash -r
fi

# Install GoblinAI dependencies
poetry install