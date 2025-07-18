import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
    Chip,
    Divider,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    Tooltip,
    Collapse
} from '@mui/material';
import {
    Security,
    Warning,
    CheckCircle,
    Link,
    Speed,
    Analytics,
    Public,
    Info,
    ExpandMore,
    ExpandLess
} from '@mui/icons-material';
import { urlAPI } from '../mockAPI';

const URLChecker = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showFeatures, setShowFeatures] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await urlAPI.predictURL({ url: url.trim() });
            setResult(response);
        } catch (err) {
            setError('Error analyzing URL. Please try again.');
            console.error('URL analysis error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSampleURL = (sampleUrl) => {
        setUrl(sampleUrl);
        setError('');
        setResult(null);
    };

    const getPredictionColor = (prediction) => {
        switch (prediction?.toLowerCase()) {
            case 'phishing':
                return 'error';
            case 'safe':
            case 'legitimate':
                return 'success';
            default:
                return 'warning';
        }
    };

    const getPredictionIcon = (prediction) => {
        switch (prediction?.toLowerCase()) {
            case 'phishing':
                return <Warning />;
            case 'safe':
            case 'legitimate':
                return <CheckCircle />;
            default:
                return <Info />;
        }
    };

    const formatFeatureName = (key) => {
        return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getFeatureDescription = (key) => {
        const descriptions = {
            url_length: 'Total length of the URL',
            domain_length: 'Length of the domain name',
            path_length: 'Length of the URL path',
            query_length: 'Length of query parameters',
            subdomain_count: 'Number of subdomains',
            has_www: 'Presence of www prefix',
            has_ip: 'IP address instead of domain',
            hyphen_count: 'Number of hyphens in domain',
            underscore_count: 'Number of underscores in URL',
            dot_count: 'Number of dots in URL',
            slash_count: 'Number of forward slashes',
            question_count: 'Number of question marks',
            equal_count: 'Number of equal signs',
            at_count: 'Number of @ symbols',
            and_count: 'Number of & symbols',
            exclamation_count: 'Number of exclamation marks',
            space_count: 'Number of spaces in URL',
            tilde_count: 'Number of tilde characters',
            comma_count: 'Number of commas',
            plus_count: 'Number of plus signs',
            asterisk_count: 'Number of asterisks',
            hash_count: 'Number of hash symbols',
            dollar_count: 'Number of dollar signs',
            percent_count: 'Number of percent signs',
            has_https: 'HTTPS protocol usage',
            has_http: 'HTTP protocol usage',
            has_suspicious_words: 'Presence of suspicious keywords',
            entropy: 'Randomness measure of URL'
        };
        return descriptions[key] || 'URL feature analysis';
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Link sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        URL Security Checker
                    </Typography>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Enter a URL to analyze its security using our advanced AI model. Our system checks for phishing indicators,
                    malicious patterns, and suspicious characteristics.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        label="Enter URL to analyze"
                        variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        sx={{ mb: 2 }}
                        error={!!error}
                        helperText={error}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <Security />}
                        sx={{ mr: 2 }}
                    >
                        {loading ? 'Analyzing...' : 'Analyze URL'}
                    </Button>
                </Box>

                {/* Sample URLs */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Sample URLs
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Try these sample URLs to test the detector
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                                onClick={() => handleSampleURL('http://suspicious-site.com/verify-account-now')}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="error">
                                        Suspicious
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        http://suspicious-site.com/verify-account-now
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                                onClick={() => handleSampleURL('https://www.google.com')}>
                                <CardContent>
                                    <Typography variant="subtitle2" color="success.main">
                                        Safe
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        https://www.google.com
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Results */}
                {result && (
                    <Box sx={{ mt: 4 }}>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Analysis Results
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            {getPredictionIcon(result.prediction)}
                                            <Typography variant="h6" sx={{ ml: 1 }}>
                                                Prediction
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={result.prediction}
                                            color={getPredictionColor(result.prediction)}
                                            size="large"
                                            sx={{ mb: 2 }}
                                        />
                                        <LinearProgress
                                            variant="determinate"
                                            value={result.confidence}
                                            color={getPredictionColor(result.prediction)}
                                            sx={{ height: 8, borderRadius: 4 }}
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Confidence: {result.confidence?.toFixed(2)}%
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Analytics sx={{ mr: 1 }} />
                                            <Typography variant="h6">
                                                Analysis Details
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>URL:</strong> {result.url || url}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>Analysis Type:</strong> {result.analysis_type || 'URL Analysis'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Model:</strong> Enhanced AI Detection
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Feature Analysis */}
                        {result.features && (
                            <Box sx={{ mt: 3 }}>
                                <Card>
                                    <CardContent>
                                        <Button
                                            onClick={() => setShowFeatures(!showFeatures)}
                                            startIcon={showFeatures ? <ExpandLess /> : <ExpandMore />}
                                            sx={{ mb: 2 }}
                                        >
                                            Feature Analysis ({Object.keys(result.features).length} features)
                                        </Button>
                                        <Collapse in={showFeatures}>
                                            <Grid container spacing={2}>
                                                {Object.entries(result.features).map(([key, value]) => (
                                                    <Grid item xs={12} sm={6} md={4} key={key}>
                                                        <Tooltip title={getFeatureDescription(key)}>
                                                            <Paper
                                                                elevation={1}
                                                                sx={{
                                                                    p: 2,
                                                                    textAlign: 'center',
                                                                    cursor: 'help'
                                                                }}
                                                            >
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {formatFeatureName(key)}
                                                                </Typography>
                                                                <Typography variant="h6" color="primary">
                                                                    {typeof value === 'number' ? value.toFixed(2) : value}
                                                                </Typography>
                                                            </Paper>
                                                        </Tooltip>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Collapse>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}

                        {/* VirusTotal Results */}
                        {result.virustotal && (
                            <Box sx={{ mt: 3 }}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Security sx={{ mr: 1 }} />
                                            <Typography variant="h6">
                                                VirusTotal Analysis
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            External security scan results
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    <strong>Malicious:</strong> {result.virustotal.malicious || 0}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    <strong>Suspicious:</strong> {result.virustotal.suspicious || 0}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    <strong>Clean:</strong> {result.virustotal.harmless || 0}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">
                                                    <strong>Undetected:</strong> {result.virustotal.undetected || 0}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Features */}
                <Box sx={{ mt: 4 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Features
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Analytics sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="subtitle2">
                                    AI-powered analysis
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Security sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="subtitle2">
                                    VirusTotal integration
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Speed sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="subtitle2">
                                    Real-time scanning
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Public sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="subtitle2">
                                    URL pattern recognition
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default URLChecker;
