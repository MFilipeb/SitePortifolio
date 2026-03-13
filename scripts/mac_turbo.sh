#!/bin/bash

# 🚀 Script de Otimização Turbo - Mac mini do Agente
# Este script ajuda a configurar o terminal para máxima produtividade.

echo "------------------------------------------------"
echo "🔍 Verificando ambiente do Mac mini..."
echo "------------------------------------------------"

# 1. Verificar Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew não encontrado. Instale primeiro com:"
    echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
else
    echo "✅ Homebrew detectado."
fi

# 2. Verificar Zsh (Padrão no Mac moderno)
if [[ $SHELL == *"zsh"* ]]; then
    echo "✅ Você já está usando o Zsh."
else
    echo "ℹ️ Recomendação: Mude para o Zsh: chsh -s /bin/zsh"
fi

# 3. Comandos para instalar Oh My Zsh e Plugins
echo ""
echo "------------------------------------------------"
echo "🛠️  PRÓXIMOS PASSOS PARA TURBINAR SEU TERMINAL:"
echo "------------------------------------------------"

echo "1. Instale o Oh My Zsh (se ainda não tiver):"
echo 'sh -c "$(curl -fsSL https://raw.github/ohmyzsh/ohmyzsh/master/tools/install.sh)"'

echo ""
echo "2. Instale o plugin zsh-autosuggestions (Sugeridor inteligente):"
echo 'git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions'

echo ""
echo "3. Instale o plugin zsh-syntax-highlighting (Cores no comando):"
echo 'git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting'

echo ""
echo "4. ATIVAÇÃO: Abra seu arquivo ~/.zshrc e procure a linha 'plugins=(...)':"
echo "Substitua por: plugins=(git zsh-autosuggestions zsh-syntax-highlighting)"
echo "Depois rode: source ~/.zshrc"

echo ""
echo "------------------------------------------------"
echo "🚀 SUGESTÕES DE APPS PREMIUM (Via Brew):"
echo "------------------------------------------------"
echo "brew install --cask iterm2 raycast rectangle shottr visual-studio-code"
echo ""
echo "✨ Divirta-se com seu novo ambiente ultra-rápido!"
