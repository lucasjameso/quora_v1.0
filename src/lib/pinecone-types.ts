/**
 * Types for Pinecone vector operations
 */

export interface PineconeVector {
  id: string;
  values: number[];
  metadata?: Record<string, any>;
}

export interface PineconeUpsertRequest {
  vectors: PineconeVector[];
  namespace?: string;
}

export interface PineconeUpsertResponse {
  upsertedCount: number;
}

export interface PineconeFetchRequest {
  ids: string[];
  namespace?: string;
}

export interface PineconeFetchResponse {
  vectors: {
    [key: string]: PineconeVector;
  };
  namespace?: string;
}

export interface PineconeQueryRequest {
  vector: number[];
  topK: number;
  includeValues?: boolean;
  includeMetadata?: boolean;
  namespace?: string;
}

export interface PineconeQueryMatch {
  id: string;
  score: number;
  values?: number[];
  metadata?: Record<string, any>;
}

export interface PineconeQueryResponse {
  matches: PineconeQueryMatch[];
  namespace?: string;
}