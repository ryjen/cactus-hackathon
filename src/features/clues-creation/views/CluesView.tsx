import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import { CluesState, CluesAction } from '../types';
import { ViewProps } from '@/lib/core/types';

// Feature flag: Only use CactusLM in development builds (not Expo Go)
const USE_CACTUS_LM = Constants.executionEnvironment === 'standalone';

// Conditionally import CactusLM
let useCactusLM: any = null;
let Message: any = null;
let CactusLMCompleteResult: any = null;

if (USE_CACTUS_LM) {
  const cactusModule = require('cactus-react-native');
  useCactusLM = cactusModule.useCactusLM;
  Message = cactusModule.Message;
  CactusLMCompleteResult = cactusModule.CactusLMCompleteResult;
}

export const CluesView = ({ state, dispatch }: ViewProps<CluesState, CluesAction>) => {
  const cactusLM = USE_CACTUS_LM ? useCactusLM({ model: 'lfm2-vl-450m' }) : null;
  const [input, setInput] = useState("What's in the image?");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!USE_CACTUS_LM || !cactusLM) return;

    if (!cactusLM.isDownloaded) {
      cactusLM.download();
    } else {
      cactusLM.init();
    }
    return () => {
      cactusLM.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [USE_CACTUS_LM, cactusLM?.isDownloaded]);

  const handleAnalyze = useCallback(async () => {
    if (!state.photoUrl) return;

    if (!USE_CACTUS_LM || !cactusLM) {
      // Fallback for Expo Go - just show a placeholder
      setResult({
        success: true,
        response: 'CactusLM is only available in development builds. Please use "npx expo run:android" to test AI features.',
        functionCalls: undefined,
        timeToFirstTokenMs: 0,
        totalTimeMs: 0,
        tokensPerSecond: 0,
        prefillTokens: 0,
        decodeTokens: 0,
        totalTokens: 0,
      });
      return;
    }

    const messages: any[] = [
      {
        role: 'system',
        content: 'You are a helpful assistant that can analyze images.',
      },
      {
        role: 'user',
        content: input,
        images: [state.photoUrl],
      },
    ];

    const completionResult = await cactusLM.complete({ messages });
    setResult(completionResult);
  }, [state.photoUrl, input, cactusLM]);

  const saveClues = useCallback(() => {
    if (!result) return;
    dispatch({ type: 'SAVE', payload: result });
  }, [result, dispatch]);

  if (USE_CACTUS_LM && cactusLM?.isDownloading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.progressText}>
          Downloading model: {Math.round(cactusLM.downloadProgress * 100)}%
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: state.photoUrl }} style={styles.image} />

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Ask about the image..."
        multiline
      />

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={[styles.button, !state.photoUrl && styles.buttonDisabled]}
          onPress={handleAnalyze}
          disabled={!state.photoUrl || (USE_CACTUS_LM && cactusLM?.isGenerating)}
        >
          <Text style={styles.buttonText}>
            {USE_CACTUS_LM && cactusLM?.isGenerating ? 'Analyzing...' : 'Analyze'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !state.photoUrl && styles.buttonDisabled]}
          onPress={saveClues}
          disabled={!state.photoUrl || (USE_CACTUS_LM && cactusLM?.isGenerating)}
        >
          <Text style={styles.buttonText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>CactusLMCompleteResult:</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultFieldLabel}>success:</Text>
            <Text style={styles.resultFieldValue}>
              {result.success.toString()}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              response:
            </Text>
            <Text style={styles.resultFieldValue}>{result.response}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              functionCalls:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.functionCalls
                ? JSON.stringify(result.functionCalls, null, 2)
                : 'undefined'}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              timeToFirstTokenMs:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.timeToFirstTokenMs.toFixed(2)}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              totalTimeMs:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.totalTimeMs.toFixed(2)}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              tokensPerSecond:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.tokensPerSecond.toFixed(2)}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              prefillTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.prefillTokens}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              decodeTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.decodeTokens}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              totalTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.totalTokens}</Text>
          </View>
        </View>
      )}

      {USE_CACTUS_LM && cactusLM?.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{cactusLM.error}</Text>
        </View>
      )}

      {!USE_CACTUS_LM && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ℹ️ AI features require a development build. Run "npx expo run:android" to enable CactusLM.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressText: {
    marginTop: 16,
    fontSize: 16,
    color: '#000',
  },
  imageButton: {
    height: 160,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageButtonText: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 16,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  resultBox: {
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 8,
  },
  resultFieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  resultFieldValue: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  marginTop: {
    marginTop: 12,
  },
  errorContainer: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
  },
});