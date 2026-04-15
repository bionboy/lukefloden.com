#!/bin/sh

# Fetch private submodule using GitHub PAT for Vercel builds
if [ -n "$GITHUB_PAT" ]; then
  git submodule set-url src/lib/resume-system "https://${GITHUB_PAT}@github.com/bionboy/resume-system.git"
  git submodule sync
fi

git submodule update --init --recursive
